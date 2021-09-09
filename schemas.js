// const Joi = require("joi");
const BaseJoi = require("joi-oid");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML!",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.testSchema = Joi.object({
  test: Joi.object({
    form: Joi.string().required().escapeHTML(),
    date: Joi.date().required(),

    scales: Joi.object({
      english: Joi.array()
        .items(
          Joi.object({
            scaled: Joi.number().min(0).max(36).required(),
          }).required()
        )
        .required(),
      math: Joi.array()
        .items(
          Joi.object({
            scaled: Joi.number().min(0).max(36).required(),
          }).required()
        )
        .required(),
      reading: Joi.array()
        .items(
          Joi.object({
            scaled: Joi.number().min(0).max(36).required(),
          }).required()
        )
        .required(),
      science: Joi.array()
        .items(
          Joi.object({
            scaled: Joi.number().min(0).max(36).required(),
          }).required()
        )
        .required(),
    }).required(),
  }),
  questions: Joi.object({
    english: Joi.array().items(
      Joi.object({
        answer: Joi.string()
          .valid("A", "B", "C", "D", "E")
          .required()
          .escapeHTML(),
        type: Joi.objectId(),
      })
    ),
    math: Joi.array().items(
      Joi.object({
        answer: Joi.string()
          .valid("A", "B", "C", "D", "E")
          .required()
          .escapeHTML(),
        type: Joi.objectId(),
      })
    ),
    reading: Joi.array().items(
      Joi.object({
        answer: Joi.string()
          .valid("A", "B", "C", "D", "E")
          .required()
          .escapeHTML(),
        type: Joi.objectId(),
      })
    ),
    science: Joi.array().items(
      Joi.object({
        answer: Joi.string()
          .valid("A", "B", "C", "D", "E")
          .required()
          .escapeHTML(),
        type: Joi.objectId(),
      })
    ),
  }).required(),
}).required();

module.exports.attemptSchema = Joi.object({
  attempt: Joi.object({
    test: Joi.objectId().required(),
    dateTaken: Joi.date().required(),
    answers: Joi.object({
      english: Joi.array()
        .required()
        .items(
          Joi.object({
            choice: Joi.string().valid("A", "B", "C", "D", "E").escapeHTML(),
            tags: Joi.array().items(
              Joi.string()
                .valid("skip", "noTime", "guess", "revised")
                .escapeHTML()
            ),
          }).required()
        ),
      math: Joi.array()
        .required()
        .items(
          Joi.object({
            choice: Joi.string().valid("A", "B", "C", "D", "E").escapeHTML(),
            tags: Joi.array().items(
              Joi.string()
                .valid("skip", "noTime", "guess", "revised")
                .escapeHTML()
            ),
          }).required()
        ),
      reading: Joi.array()
        .required()
        .items(
          Joi.object({
            choice: Joi.string().valid("A", "B", "C", "D", "E").escapeHTML(),
            tags: Joi.array().items(
              Joi.string()
                .valid("skip", "noTime", "guess", "revised")
                .escapeHTML()
            ),
          }).required()
        ),
      science: Joi.array()
        .required()
        .items(
          Joi.object({
            choice: Joi.string().valid("A", "B", "C", "D", "E").escapeHTML(),
            tags: Joi.array().items(
              Joi.string()
                .valid("skip", "noTime", "guess", "revised")
                .escapeHTML()
            ),
          }).required()
        ),
    }).required(),
  }),
}).required();

module.exports.questionTypeSchema = Joi.object({
  questionType: Joi.object({
    name: Joi.string().required().escapeHTML(),
    general: Joi.string().required().escapeHTML(),
    section: Joi.string()
      .valid("English", "Math", "Reading", "Science")
      .required()
      .escapeHTML(),
    resources: Joi.array().items(
      Joi.object({
        link: Joi.string().uri().escapeHTML(),
        name: Joi.string().required().escapeHTML(),
        format: Joi.string()
          .valid("Video", "Article", "Text", "Formula")
          .required()
          .escapeHTML(),
        description: Joi.string().escapeHTML(),
      })
    ),
  }).required(),
}).required();
