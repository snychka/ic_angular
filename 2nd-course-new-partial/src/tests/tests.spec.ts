import { assert } from 'chai';
import { 
  SyntaxKind, 
  Project,
  ObjectLiteralExpression,
  PropertyAssignment } from 'ts-morph';
import { readFileSync } from 'fs';
//import { SyntaxKind } from 'typescript';
import { parse, valid } from 'node-html-parser';
let util = require('util');

describe('extracting markup', () => {
  const userCode = readFileSync('src/app/app.component.ts', 'utf-8');
  const htmlCode = readFileSync('src/index.html', 'utf-8');
  const htmlAst = parse(htmlCode);
  const project = new Project();
  const sourceFile = project.createSourceFile('src/compiled/app.component.ts', userCode);

  const decorator = sourceFile.getClass('AppComponent').getDecorator('Component')
  const decoratorComma = decorator && decorator.getFirstChildByKind(SyntaxKind.CallExpression)
    .getFirstChildByKind(SyntaxKind.SyntaxList)
    .getFirstChildByKind(SyntaxKind.ObjectLiteralExpression)
    .getFirstChildByKind(SyntaxKind.SyntaxList)
    .getFirstChildByKind(SyntaxKind.CommaToken)

  //console.log('stef: ' + util.inspect((decorator.getArguments()[0] as ObjectLiteralExpression).getProperties()));
  //const properties = decorator ? decorator.getArguments()[0].compilerNode.properties : undefined
  const properties = decorator ? (decorator.getArguments()[0] as ObjectLiteralExpression).getProperties() : undefined
  //const templateProp = properties && properties.find(prop => prop.name.escapedText === 'template')
  const templateProp : PropertyAssignment = properties && (properties.find((prop : PropertyAssignment) => prop.getName() === 'template') as PropertyAssignment)
  const templateHtml = templateProp && templateProp.getInitializer && templateProp.getInitializer()

  /*

  const templateBacktick = decorator && properties && templateProp && templateHtml && decorator.getFirstChildByKind(SyntaxKind.CallExpression)
    .getFirstChildByKind(SyntaxKind.SyntaxList)
    .getFirstChildByKind(SyntaxKind.ObjectLiteralExpression)
    .getLastChildByKind(SyntaxKind.PropertyAssignment)
    .getFirstChildByKind(SyntaxKind.NoSubstitutionTemplateLiteral)

  let astError = undefined;
  if (!valid(htmlCode)) {
    astError = 'index.html is invalid';
  } else if (!valid(templateHtml)) {
    astError = 'template html is invalid';
  }

  const templateAst = parse(templateHtml);

  beforeEach(() => {
    const stmt = `Hmm, it seems there's something wrong with our code. \nWe are getting the following error: `
    if (astError !== undefined) {
      assert(false, `${stmt} \`${astError}\``)
    }
    assert(decorator, "Oops, it looks like we did not include a `@Component` decorator in our class.")
  });

    describe('one', () => {
      it('f_valid_html', () => {
        const mainApp = htmlAst.querySelector('main-app');
        assert(mainApp, "It looks like we still need to add the `main-app` tag to our html body.  Remember to close the `main-app` element and to not include any child text or elements.")
      })
    })

    describe('two', () => {
      it('f_selector', () => {
        const selectorProp = properties.find(prop => prop.name.escapedText === 'selector')
        assert(selectorProp, "Let's make sure we've added `selector` as a property to our `@Component` decorator.")
        const selectorValue = properties.find(prop => prop.name.escapedText === 'selector').initializer.text
        assert(selectorValue === 'main-app', "Close! We have the `selector` property, now we need to double check that the value matches the html tag we added earlier.")
      })
    })

    describe('three', () => {
      it('f_template', () => {
        const templateProp = properties.find(prop => prop.name.escapedText === 'template')
        assert(templateProp && decoratorComma, "Let's make sure we've added `template` as a property to our `@Component` decorator and separate the properties with a `,`.")
        assert(div && h1 && p && templateBacktick, "Uh-oh, let's make sure we're assigning the correct value to our `template` property and using backticks `` required to make our template literal.")
      })
    })

    describe('four', () => {
      it('f_h1_reference', () => {
        assert(templateAst.div && templateAst.div.h1, "Let's make sure we have an `h1`.")
        const h1Text = h1.children.find(x => x.type === 'text').contents
        assert(/{{\s*pageTitle\s*}}/.test(h1Text), "Let's make sure we are referencing the `pageTitle` property from the `AppComponent` class inside the `h1` tag of our template.")
        assert(p, "Let's make sure we have a `p`.")
        const pText = p.children.find(x => x.type === 'text').contents
        assert(/{{\s*currentPromotion\s*}}/.test(pText), "Almost there! We just need to reference the `currentPromotion` property from the `AppComponent` class inside the `p` tag of our template.")
      })
    })
    */

})

