ACT Analyst by Belal Elsiesy

An app to help students improve their ACT math score, using score data.


PAGES      _____________________________________________________


Navbar: Home, Data, Analyze, Resources Login/Account

Homepage: Introduce site, describe philosophy + study method

Data: Tables with data, and options to log data.
    Add:  like scantron with tags to mark guess, doubt, time, and unmarked
    Review: Second chance for wrong questions, try without time constraints, option to skip
    Results: Score, with question type, links to videos + explanations(resources page)

Analyze: tables and charts with data, worst topics, best topics, group questions by type, each question type has links to resources page)

Resources: Links to various resources by me and others for each question type, and sample questions for those types.

Login: If not logged in, show in navbar; login with email, google, facebook, or apple

Account: Manage email, password, name, etc

Data Models _____________________________________________________

User: 
    - id
    - name
    - email
    - username
    - password
    - attempts

Test (constant): 
    - id
    - form
    - date
    - questions:

Question: 
- number
- answers: 
    - tags (correct, hustle)
    - explanations 
- type: "General.Specific"


Attempt (user): 
    - id 
    - form
    - dateTaken
    - answers: 
        - choice
        - tags (time, skip, guess, corrected, etc)

Question Type:
- general_field (Algebra, Geometry, Trig, etc)
- resources
    - videos
    - articles
    - text_explanations
    - formulas
- questions
    -> We can derive % based on this



RESOURCES _____________________________________________________

- Github
- Bootstrap
- HighCharts
