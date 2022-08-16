/**
 * ```"<p>hello world</p>"``` => ```"hello world"```
 *
 * Gets the text [Content](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics#anatomy_of_an_html_element) between two HTML tags.
 * I used it to get the text in between an HTML <span> but it should work for any HTML element.
 * It won't work if the html doesn't have its full brackets though.
 *
 * Info on the Regex: https://regexr.com/6s0rs
 */
export const parseHtmlContent = (htmlString: string) => {
  // see https://regexr.com/6s0rs for pattern info
  const regex = new RegExp("(?<=>)(.*)(?=<)");
  const result: RegExpExecArray | null = regex.exec(htmlString);
  if (!result) {
    return null;
  } else {
    return result[0];
  }
};

// TODO Jest tests

// expected: "hello world"
const testCase1 = "<p>hello world</p>";

// expected: "puffed tofu, snow peas + edamame in Szechuan coconut sauce with fresh lo mein noodles; Korean red pepper flake + cashew crumble; smashed cucumber salad; baby bok choy with black garlic (ingredients ~$10)"
const testCase2 =
  '<span data-sheets-value="{&quot;1&quot;:2,&quot;2&quot;:&quot;puffed tofu, snow peas + edamame in Szechuan coconut sauce with fresh lo mein noodles; Korean red pepper flake + cashew crumble; smashed cucumber salad; baby bok choy with black garlic (ingredients ~$10)&quot;}" data-sheets-userformat="{&quot;2&quot;:4537,&quot;3&quot;:{&quot;1&quot;:4,&quot;2&quot;:&quot;\\&quot;$\\&quot;#,##0.00&quot;},&quot;6&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;7&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:1}]},&quot;8&quot;:{&quot;1&quot;:[{&quot;1&quot;:2,&quot;2&quot;:0,&quot;5&quot;:{&quot;1&quot;:2,&quot;2&quot;:0}},{&quot;1&quot;:0,&quot;2&quot;:0,&quot;3&quot;:3},{&quot;1&quot;:1,&quot;2&quot;:0,&quot;4&quot;:2}]},&quot;10&quot;:0,&quot;11&quot;:4,&quot;15&quot;:&quot;Calibri&quot;}" data-sheets-formula="=CONCATENATE(Menu!R[4]C[0],&quot; (ingredients ~$&quot;,Menu!R[12]C[2],&quot;)&quot;)">puffed tofu, snow peas + edamame in Szechuan coconut sauce with fresh lo mein noodles; Korean red pepper flake + cashew crumble; smashed cucumber salad; baby bok choy with black garlic (ingredients ~$10)</span>';
