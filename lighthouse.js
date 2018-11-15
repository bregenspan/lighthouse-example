const lighthouse = require("lighthouse");

const chromeLauncher = require("chrome-launcher");

const launchChromeAndRunLighthouse = (url, opts, config = null) =>
  chromeLauncher.launch({ chromeFlags: opts.chromeFlags }).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {
      return chrome.kill().then(() => results.lhr);
    });
  });

const opts = {
  chromeFlags: ["--headless"],
  onlyCategories: ["performance"]
};

const auditSite = (url, _config = {}) => {
  const config = { verbose: true, ..._config };

  const logVerbose = log => {
    if (config.verbose) console.log(log);
  };

  logVerbose(`Starting audit of ${url} ...`);

  return launchChromeAndRunLighthouse(url, opts).then(results => {
    logVerbose(
      "score, TT Interactive, TT 1st Meaningful Paint, TTFB, Speed Index"
    );

    const report = [
      results.categories.performance.score,
      results.audits.interactive.rawValue,
      results.audits["first-meaningful-paint"].rawValue,
      results.audits["time-to-first-byte"].rawValue,
      results.audits["speed-index"].rawValue
    ]
      .map(datum => (datum > 1000 ? Math.round(datum) : datum))
      .join(", ");

    console.log(report);
  });
};

const auditSiteLoop = async url => {
  for (let i = 0; i < 1000; i++) {
    await auditSite(url, { verbose: i === 0 });
  }
};

module.exports = {
  launchChromeAndRunLighthouse,
  auditSite,
  auditSiteLoop
};
