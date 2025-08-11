/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define([
  'N/file',
  'N/runtime',
  './esp_cm_constants',
  './esp_cm_utils'
],
  /**
   * @param{file} file
   * @param{runtime} runtime
   */
  (file, runtime, env, utils) => {

    function runApp(context) {
      const suiteletUrl = utils.Url.suiteletUrl();
      const fileObj = {
        template: file.load(env.AppFilePath.TEMPLATE),
        style: file.load(env.AppFilePath.STYLE),
        js: file.load(env.AppFilePath.JS),
        svg: file.load(env.AppFilePath.SVG),
      }
      let htmlStr = fileObj.template.getContents();
      htmlStr = htmlStr
        .replace('{{suiteletUrl}}', encodeURIComponent(suiteletUrl))
        .replace('<script type="module" crossorigin src="/app.js"></script>', `<script type="module" crossorigin src="${fileObj.js.url}"></script>`)
        .replace('<link rel="stylesheet" crossorigin href="/index.css">', `<link rel="stylesheet" crossorigin href="${fileObj.style.url}">`)
        .replace('<link rel="icon" type="image/svg+xml" href="/public/react.svg" />', `<link rel="icon" type="image/svg+xml" href="${fileObj.svg.url}" />`);
      context.response.write(htmlStr);
    }

    return {
      runApp
    }
  });