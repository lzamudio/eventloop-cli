/*
* This function handles the next cases:
*
* Empty const SCHEMAS
* + export const SCHEMAS = { }
*
* Empty const SCHEMAS but with the bracket that close on a different line
* + export const SCHEMAS = {
* + }
*
* When every key-value pair are on different lines and the bracket that closes
* is on the last line
* + export const SCHEMAS = {
* +   KEY: 'value',
* +   KEY2: 'value2'
* + }
*
*
*/

export function addDeclarationToConst(content: string, constantName: string, constantValue: string) {
  let chunks = content.split('\n');
  let init = false;
  let bracketOpen = 0;
  let bracketClose = 0;
  let data = '';
  let jsonSchemaConst: string[] = [];

  for (let i = 0; i < chunks.length; i++) {
      const line = chunks[i];
      const lineWithoutBlankSpaces = line.replace(/\s/g,'');

      if(lineWithoutBlankSpaces === 'exportconstSCHEMAS={}' || lineWithoutBlankSpaces === 'exportconstSCHEMAS={};' ) {
        data += ['export const SCHEMAS = {', `  ${ generateSchemaNameValue(constantName, constantValue)}`, '}' ].join('\n');
      } else if(lineWithoutBlankSpaces.endsWith('exportconstSCHEMAS={')) {
        init = true;
        let results = searchBrackets(line);
        bracketOpen  += results.bracketOpen;
        bracketClose += results.bracketClose;

        if(line.trim() !== '' ) {
          jsonSchemaConst.push(line);
        }

      } else if(init) {
        let results = searchBrackets(line);
        bracketOpen  += results.bracketOpen;
        bracketClose += results.bracketClose;

        if(bracketOpen === bracketClose) {
          init = false;
          if(isAloneBracket(line)) {
            let before = jsonSchemaConst.pop()!;

            jsonSchemaConst.push(buildLineWithComma(before));
            jsonSchemaConst.push(`  ${generateSchemaNameValue(constantName, constantValue)}`);
            jsonSchemaConst.push('}');

            data += jsonSchemaConst.join('\n');
          } else {
            data += jsonSchemaConst.join('\n');
            data += '\n';
            data += insertNewDefinitionOnSameLine(line, constantName, constantValue);
          }
        } else{
          if(line.trim() !== '' ) {
            jsonSchemaConst.push(line);
          }
        }
      }else {
        data += `${line}\n`;
      }
  }

  return data;
}

function insertNewDefinitionOnSameLine(line: string, constantName: string, constantValue: string) {
  let findLastOccurrence = line.lastIndexOf('}');
  let firstChunk = line.slice(0, findLastOccurrence).trimRight();
  let lastChunk = line.slice(findLastOccurrence);
  let newDefinition = '';

  if(firstChunk.endsWith(',')) {
    newDefinition = ` ${generateSchemaNameValue(constantName, constantValue)}`;
  } else {
    newDefinition = `, ${generateSchemaNameValue(constantName, constantValue)}`;
  }

  return firstChunk + newDefinition + lastChunk;
}

function isAloneBracket(line: string) {
  const lineWithoutBlankSpaces = line.replace(/\s/g,'');

  return lineWithoutBlankSpaces === '}' || lineWithoutBlankSpaces === '};';
}

function buildLineWithComma(line: string) {
  const lineWithoutBlankSpaces = line.replace(/\s/g,'');
  if(lineWithoutBlankSpaces.endsWith('{') || line.trim().endsWith(',')) {
    return line;
  }

  return `${line},`;
}

function searchBrackets(line: string) {
  let bracketOpen = 0;
  let bracketClose = 0;
  for (let char of line) {
      if(char === '{') bracketOpen++;
      if(char === '}') bracketClose++;
  }

  return { bracketOpen, bracketClose };
}

function generateSchemaNameValue(constantName: string, constantValue: string) {
  const template = `${constantName}: '${constantValue}'`;

  return template;
}
