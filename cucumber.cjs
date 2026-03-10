module.exports = {
  default: [
    'tests/ui/**/*.feature',
    '--import', 'tests/ui/steps/**/*.ts',
    '--require-module', 'ts-node/register',
    '--format', 'progress',
    '--format', 'html:reports/cucumber-report.html'
  ]
};