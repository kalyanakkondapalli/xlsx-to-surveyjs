# xlsx-to-surveyjs

Convert XLSX sheets into SurveyJS JSON forms.

## Install

```bash
npm install -g xlsx-to-surveyjs
```

## CLI Usage

```bash
xlsx2surveyjs myfile.xlsx -o output.json
```

## API Usage

```js
import { convertXlsxToSurveyJS } from "xlsx-to-surveyjs";

const forms = convertXlsxToSurveyJS("myfile.xlsx");
console.log(forms);
```

Each sheet becomes a SurveyJS form/page. If an "Expression" column is present, it is converted to a SurveyJS expression.
