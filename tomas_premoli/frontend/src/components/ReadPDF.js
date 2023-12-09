import React, { useState, useEffect } from 'react';

export default function ReadPDF() {
    var encodedUrl = "";
    if (myData != null) {
        encodedUrl = `./static/PDFjs/web/viewer.html?file=${encodeURIComponent(myData.cv)}`;
    }

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