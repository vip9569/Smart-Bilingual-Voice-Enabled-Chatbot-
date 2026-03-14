// import { franc } from 'franc';
// import langs from 'langs';

// export function detectLanguage(text) {
//     // Use franc to get the ISO 639-3 language code
//     const langCode = franc(text);

//     console.log(langCode)

//     if (langCode === 'und') {
//         console.log("Sorry, could not find the language (undetermined)");
//         return "undetermined"
//     }

//     if (langCode === 'eng') {
//         return "English"
//     }
//     if (langCode === "hin") {
//         return "Hindi"
//     }
//     // else {
//     // Use langs to get the full language name from the code
//     // const language = langs.where("3", langCode);
//     // if (language) {
//     // console.log(`Detected Language: ${language.name} (${langCode})`);
//     // if (language.name === 'English' || language.name === 'Hindi') {
//     //     // console.log(`The language is either English or Hindi.`);
//     //     return language.name
//     // }
//     // if (language.name === 'Hindi') {
//     //     // console.log(`The language is either English or Hindi.`);
//     //     return language.name
//     // }
//     // } 
//     else {
//         console.log(`Found language code: ${langCode}, but could not find the name.`);
//     }
//     // }
// }


export function detectLanguage(text) {
    // split into words
    const langs = text.trim().split(/\s+/).map(word => {
        return detect(word)
    })
    // pick the lang with the most occurances
    return (langs || []).reduce((acc, el) => {
        acc.k[el] = acc.k[el] ? acc.k[el] + 1 : 1
        acc.max = acc.max ? acc.max < acc.k[el] ? el : acc.max : el
        return acc
    }, { k: {} }).max
    function detect(text) {
        const scores = {}

        const regexes = {
            'en': /[\u0000-\u007F]/gi,
            'zh': /[\u3000\u3400-\u4DBF\u4E00-\u9FFF]/gi,
            'hi': /[\u0900-\u097F]/gi,
            'ar': /[\u0621-\u064A\u0660-\u0669]/gi,
            'bn': /[\u0995-\u09B9\u09CE\u09DC-\u09DF\u0985-\u0994\u09BE-\u09CC\u09D7\u09BC]/gi,
            'he': /[\u0590-\u05FF]/gi,
        }
        for (const [lang, regex] of Object.entries(regexes)) {
            // detect occurances of lang in a word
            let matches = text.match(regex) || []
            let score = matches.length / text.length
            if (score) {
                // high percentage, return result
                if (score > 0.85) {
                    return lang
                }
                scores[lang] = score
            }
        }
        // not detected
        if (Object.keys(scores).length == 0)
            return null
        // pick lang with highest percentage
        return Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    }
}
