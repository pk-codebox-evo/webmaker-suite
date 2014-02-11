/**
 * AWS-deployment-only script for rewriting the env
 * files to point to the correct EC2 host, rather
 * than to http://localhost:port locations.
 */
require("./lib/awsenv.js")(process.env["WMSUITE-HOSTNAME"]);
