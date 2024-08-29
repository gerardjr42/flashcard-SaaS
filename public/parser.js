const fs = require("fs");
const PDFParser = require("pdf2json");

const files = fs.readdirSync("pdfs");

let pdfs = [];

(async () => {
    const parsedFiles = await Promise.all(files.map(async (file) => {
        let pdfParser = new PDFParser(this, 1);

        pdfParser.loadPDF(`pdfs/${file}`);

        let pdf = await new Promise(async (resolve, reject) => {
            pdfParser.on("pdfParser_dataReady", (pdfData) => {
                const raw = pdfParser.getRawTextContent().replace(/\r\n/g, " ");
                console.log(raw);
                const box1 = (/Box 1.\s(.*?)Box 2/.exec(raw)?.[1] || "Not found").trim();
                const box2 = (/Box 2.\s*(.*?)Box 3/.exec(raw)?.[1] || "Not found").trim();
                const box3 = (/Box 3.\s*(.*?)Box 4/.exec(raw)?.[1] || "Not found").trim();
                const box4 = (/Box 4.\s*(.*?)Box 5/.exec(raw)?.[1] || "Not found").trim();
                const box5 = (/Box 5.\s*(.*?)DETACH HEREAND MAIL BOTTOM PORTION WITH YOUR PAYMENT/.exec(raw)?.[1] || "Not found").trim();
                const mailInstructions = (/DETACH HEREAND MAIL BOTTOM PORTION WITH YOUR PAYMENT \s*(.*?)Enter the amount of the payment you are making./.exec(raw)?.[1] || "Not found").trim();

                resolve({
                    box1,
                    box2,
                    box3,
                    box4,
                    box5,
                    mailInstructions,
                });
            });
        });
        pdfs.push(pdf)
        console.log(pdfs)
    }));
    // After all files are processed, you can do something with the `pdfs` array
    // For example, you can write the output to a JSON file:
    fs.writeFileSync("parsed_pdfs.json", JSON.stringify(pdfs, null, 2));
    // console.log("PDF data has been processed and saved to parsed_pdfs.json");

})();
//             });
//         });
//     }));
// })();

// import fs from "fs";
// import PDFParser from "pdf2json"; 

// const pdfParser = new PDFParser();

// pdfParser.on("pdfParser_dataError", (errData) =>
//  console.error(errData.parserError)
// );
// pdfParser.on("pdfParser_dataReady", (pdfData) => {
//  fs.writeFile(
//   "./pdf2json/test/VOUCHEF.json",
//   JSON.stringify(pdfData),
//   (data) => console.log(data)
//  );
// });

// pdfParser.loadPDF("./pdf2json/test/pdf/fd/form/F1040EZ.pdf");