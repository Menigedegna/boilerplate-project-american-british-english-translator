const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  formatTime(text, locale) {
    var sep = "";
    var replacingSep = "";
    var timePattern = "";

    if (locale == "american-to-british") {
      sep = ":";
      replacingSep = ".";
      timePattern = new RegExp('[0-9]+:[0-9]+');
    } else {
      sep = ".";
      replacingSep = ":";
      timePattern = new RegExp('[0-9]+[.h][0-9]+');
    }

    while (text.search(timePattern) > -1) {
      text = text.replace(timePattern, (match) => {
        var formatedText = match.split(sep).join(replacingSep);
        var result = '<span class="highlight">' + formatedText + "</span>";
        return result;
      });
    }
    return text;
  }

  searchWordInDict (wordArray, counter, dictKeys) {
    /*SEARCH RECURSIVELY FOR CONSECUTIVE WORDS IN A DICTIONARY*/
    var foundWords = [];
    if (counter < 1) {
      return foundWords;
    }
    else {
      foundWords = this.searchWordInDict(wordArray, counter - 1, dictKeys);
      //add next item in text and see if I find the words in dictionary
      if (dictKeys.indexOf(wordArray.slice(0, counter).join("").toLowerCase()) > -1) {
        foundWords.push(wordArray[counter-1].toLowerCase());
      }
      return foundWords;
    }
  }

  translateText(text, dictionary, titleDictionary) {
    /*GO OVER EACH WORD IN TEXT TRANSLATE AND FORMAT*/

    //convert text into array of words
    var subWords = text.match(/[a-z]+|[.:,;'!?\s]|[0-9]+/ig);
    //convert dictionary keys into one string
    var titleDictKey = Object.keys(titleDictionary).join(" ");
    var dictKey = Object.keys(dictionary).join(" ");     
    var translateAll = "";

    //for each item in text
    var countWord = 0;
    while (countWord < subWords.length) {
      var translate = "";
      var keyFound = [];
      var subWord =  subWords[countWord];
      var itemFound = false;
      
      //if subWord is a word
      if (subWord.search(/[a-z]/i) == 0) {
        //search for item in title dictionary
        var wordArray = subWords.slice(countWord);
        keyFound = this.searchWordInDict(wordArray, wordArray.length, titleDictKey);
        if(keyFound.slice(-1)[0] == " "){
          keyFound.splice(-1);
        }
        if (keyFound.length>0 && Object.keys(titleDictionary).indexOf(keyFound.join("")) > -1){
          translate = titleDictionary[keyFound.join("")];
          var formatedText = translate.charAt(0).toUpperCase() + translate.slice(1);
          translateAll = translateAll + '<span class="highlight">' + formatedText + '</span>';
          countWord = countWord + keyFound.length;
          itemFound = true;
        }else{
          //search for item in other dictionary
          keyFound = this.searchWordInDict(wordArray, wordArray.length, dictKey);
          if(keyFound.slice(-1)[0] == " "){
            keyFound.splice(-1);
          }
          if (keyFound.length>0 && Object.keys(dictionary).indexOf(keyFound.join("")) > -1){
            translate = dictionary[keyFound.join("")];
            translateAll = translateAll + '<span class="highlight">' + translate + '</span>';
            countWord = countWord + keyFound.length;
            itemFound = true;
          }
        }
      }
      //if item in text isn't found in any dictionary
      if( !itemFound ){
        translateAll = translateAll + subWord;
        countWord += 1;
      }
    }//end while loop

    //format translated text
    translateAll = translateAll.trim();
    var result = translateAll.charAt(0).toUpperCase() + translateAll.slice(1);
    return result
  }

  chooseReference(text, locale) {
    /*CHOOSE APPROPRIATE DICTIONARY AND RUN TRANSLATION*/
    var translation = "";
    var timeAdjustedText = "";
    var dictionary = {};
    var titleDictionary = {};

    //regroup all references into one dictionary
    if (locale == "american-to-british") {
      dictionary = { ...americanOnly, ...americanToBritishSpelling };
      titleDictionary = americanToBritishTitles;
    }
    // if locale = british-to-american
    else {
      //invert key into values for americanToBritishSpelling and americanToBritishTitles
      var invertedDict = Object.entries(americanToBritishSpelling).map(([k, v]) => [v, k]);
      var britishToAmericanSpelling = Object.fromEntries(invertedDict);
      // create a dictionary with all references
      dictionary = { ...britishOnly, ...britishToAmericanSpelling };

      invertedDict = Object.entries(americanToBritishTitles).map(([k, v]) => [v, k]);
      titleDictionary = Object.fromEntries(invertedDict);
    }

    //run translation on text with chosen dictionary
    translation = this.translateText(text, dictionary, titleDictionary);
    //format time in text 
    timeAdjustedText = this.formatTime(translation, locale);
    if (timeAdjustedText == text) {
      timeAdjustedText = "Everything looks good to me!";
    }
    return timeAdjustedText;
  }
}

module.exports = Translator;
