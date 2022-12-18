'use strict';

const Translator = require('../components/translator.js');

module.exports = function(app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {

      let result = "";

      //if input is not missing
      if (Object.keys(req.body).indexOf('text') > -1
        && Object.keys(req.body).indexOf('locale') > -1) {
        var locale = req.body.locale;
        var text = req.body.text;
        //if text is provided
        if (text) {
          if (locale == "american-to-british" || locale == "british-to-american") {
            result = translator.chooseReference(text, locale)
            res.send({
              text: text,
              translation: result
            });
          }
          else {
            res.send({
              error: "Invalid value for locale field"
            });
          }
        }//end if text is not provided
        else {
          res.send({
            error: "No text to translate"
          });
        }
      }//end if input is not missing
      else {
        res.send({
          error: 'Required field(s) missing'
        });
      }
    });

};
