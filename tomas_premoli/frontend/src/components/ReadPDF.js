import React, { useState, useEffect } from 'react';

export default function ReadPDF() {
    const [pdfData, setpdfData] = useState(null);

    useEffect(() => {
        // Parse the hash and query parameters
        const hash = window.location.hash;
        const queryStartIndex = hash.indexOf('?');

        if (queryStartIndex >= 0) {
            const query = hash.substring(queryStartIndex + 1);
            const params = new URLSearchParams(query);
            const pdfid = params.get('id');

            fetch("./api/pdf?id=" + pdfid + "&format=json")
                    .then(response => response.json())
                    .then((data) => {
                        setpdfData(data);
                    });
        }
    }, []);

    var encodedUrl = "";
    if (pdfData) {
        encodedUrl = `./static/PDFjs/web/viewer.html?file=${encodeURIComponent(pdfData.pdf)}`;
    }

    return (
    <iframe id="pdf-js-viewer"
        src={encodedUrl ? encodedUrl : null}
        title="my-cv"
        frameBorder="0"
        width="100%"
        height="100%">
    </iframe>
    );

}