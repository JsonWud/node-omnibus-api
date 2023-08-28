function logBanner(title, data) {
    console.log('\x1b[36m%s\x1b[0m', '#'.repeat(80));
    console.log('#'.repeat(80));
    console.log(title)
    console.log('#'.repeat(80));
    data ? console.log(data) : null
    data ? console.log('#'.repeat(80)) : null
    console.log('\x1b[36m%s\x1b[0m', '#'.repeat(80));
}

module.exports = logBanner;