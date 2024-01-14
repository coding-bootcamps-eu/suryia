const express = require("express");
const app = express();
const port = 3000;

const urlMapping = [
  { slug: "beispiel", url: "https://www.beispiel.com" },
  { slug: "wurstbrot", url: "https://www.wurst3000.com" },
];

app.get("/:slug", (req, res) => {
  const slugFromUrl = req.params.slug;

  let urlToRedirect = null;

  for (let i = 0; i < urlMapping.length; i++) {
    if (urlMapping[i].slug === slugFromUrl) {
      urlToRedirect = urlMapping[i].url;
      break;
    }
  }
  if (urlToRedirect) {
    res.redirect(urlToRedirect);
  } else {
    res.status(404).send("Slug nicht gefunden");
  }
});

app.listen(port, () =>
  console.log(`Server läuft auf http://localhost:${port}`)
);
