// const Joi = require("joi");
const Joi = require("joi-oid");

module.exports.testSchema = Joi.object({
  test: Joi.object({
    form: Joi.string().required(),
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
        answer: Joi.string().valid("A", "B", "C", "D", "E").required(),
        type: Joi.objectId(),
      })
    ),
    math: Joi.array().items(
      Joi.object({
        answer: Joi.string().valid("A", "B", "C", "D", "E").required(),
        type: Joi.objectId(),
      })
    ),
    reading: Joi.array().items(
      Joi.object({
        answer: Joi.string().valid("A", "B", "C", "D", "E").required(),
        type: Joi.objectId(),
      })
    ),
    science: Joi.array().items(
      Joi.object({
        answer: Joi.string().valid("A", "B", "C", "D", "E").required(),
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
            choice: Joi.string().valid("A", "B", "C", "D", "E"),
            tags: Joi.array().items(
              Joi.string().valid("skip", "noTime", "guess", "revised")
            ),
          }).required()
        ),
      math: Joi.array()
        .required()
        .items(
          Joi.object({
            choice: Joi.string().valid("A", "B", "C", "D", "E"),
            tags: Joi.array().items(
              Joi.string().valid("skip", "noTime", "guess", "revised")
            ),
          }).required()
        ),
      reading: Joi.array()
        .required()
        .items(
          Joi.object({
            choice: Joi.string().valid("A", "B", "C", "D", "E"),
            tags: Joi.array().items(
              Joi.string().valid("skip", "noTime", "guess", "revised")
            ),
          }).required()
        ),
      science: Joi.array()
        .required()
        .items(
          Joi.object({
            choice: Joi.string().valid("A", "B", "C", "D", "E"),
            tags: Joi.array().items(
              Joi.string().valid("skip", "noTime", "guess", "revised")
            ),
          }).required()
        ),
    }).required(),
  }),
}).required();

module.exports.questionTypeSchema = Joi.object({
  questionType: Joi.object({
    name: Joi.string().required(),
    general: Joi.string().required(),
    section: Joi.string()
      .valid("English", "Math", "Reading", "Science")
      .required(),
    resources: Joi.array().items(
      Joi.object({
        link: Joi.string().uri(),
        name: Joi.string().required(),
        format: Joi.string()
          .valid("Video", "Article", "Text", "Formula")
          .required(),
        description: Joi.string(),
      })
    ),
  }).required(),
}).required();
