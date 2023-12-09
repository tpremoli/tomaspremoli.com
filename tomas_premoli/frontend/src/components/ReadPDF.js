import React, { useState, useEffect } from 'react';

export default function ReadPDF() {
    const [encodedUrl, setEncodedUrl] = useState(null);

    useEffect(() => {
        // Get the current URL
        const currentUrl = window.location.href;
        
        // Create a URL object
        const url = new URL(currentUrl);

        // Use URLSearchParams to get 'pdfFile' query parameter
        const pdfFile = url.searchParams.get('pdfFile');

        // Check if pdfFile is not null and then encode it
        if (pdfFile) {
            const encodedPdfFile = `./static/PDFjs/web/viewer.html?file=${encodeURIComponent(pdfFile)}`;
            setEncodedUrl(encodedPdfFile);
        }
    }, []);
    
    return (
        <Box sx={{ height: "100%", }}>
        <center style={{ height: "100%", }}>
            <iframe id="pdf-js-viewer"
                src={encodedUrl ? encodedUrl : null}
                title="my-cv"
                frameBorder="0"
                width="90%"
                height="90%">
            </iframe>
        </center>
        </Box>
    );

}