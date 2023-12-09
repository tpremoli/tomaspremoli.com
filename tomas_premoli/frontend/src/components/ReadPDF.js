import React, { useState, useEffect } from 'react';

export default function ReadPDF() {
    const [encodedUrl, setEncodedUrl] = useState(null);

    useEffect(() => {
        // Parse the hash and query parameters
        const hash = window.location.hash;
        const queryStartIndex = hash.indexOf('?');

        if (queryStartIndex >= 0) {
            const query = hash.substring(queryStartIndex + 1);
            const params = new URLSearchParams(query);
            const pdfFile = params.get('pdfFile');

            if (pdfFile) {
                const encodedPdfFile = `./static/PDFjs/web/viewer.html?file=${encodeURIComponent(pdfFile)}`;
                setEncodedUrl(encodedPdfFile);
            }
        }
    }, []);

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