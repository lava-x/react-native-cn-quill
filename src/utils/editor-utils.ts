import type { CustomFont } from 'src/types';
import {
  create_quill,
  editor_css,
  editor_js,
  quill_bubble_css,
  quill_snow_css,
  quill_js,
} from '../constants/editor';

export const getFontName = (font: string) => {
  return font.toLowerCase().replace(/\s/g, '-');
};

interface CreateHtmlArgs {
  initialHtml?: string;
  placeholder: string;
  toolbar: string;
  libraries: 'local' | 'cdn';
  theme: 'snow' | 'bubble';
  editorId: string;
  containerId: string;
  color: string;
  backgroundColor: string;
  placeholderColor: string;
  customStyles: string[];
  fonts: Array<CustomFont>;
  defaultFontFamily?: string;
}

const Inital_Args = {
  initialHtml: '',
  placeholder: 'write here',
  toolbar: 'false',
  libraries: 'local',
  theme: 'snow',
  editorId: 'editor-container',
  containerId: 'standalone-container',
  color: 'black',
  backgroundColor: 'white',
  placeholderColor: 'rgba(0,0,0,0.6)',
  customStyles: [],
  fonts: [],
} as CreateHtmlArgs;

export const createHtml = (args: CreateHtmlArgs = Inital_Args) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, user-scalable=1.0,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
  ${
    args.theme === 'bubble'
      ? quill_bubble_css(args.libraries === 'cdn')
      : quill_snow_css(args.libraries === 'cdn')
  }
  ${editor_css(
    args.editorId,
    args.containerId,
    args.color,
    args.backgroundColor,
    args.placeholderColor,
    args.fonts,
    args.defaultFontFamily
  )}
  ${
    args.customStyles &&
    args.customStyles
      .map((style) => {
        return style.toLocaleLowerCase().trim().startsWith('<style>')
          ? style
          : `<style>${style}</style>`;
      })
      .join('\n')
  }
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"></script>
  <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css">
  </head>
  <body>
  <div id="${args.containerId}">
  <div id="${args.editorId}">
    ${args.initialHtml}
  </div>
  </div>
  ${quill_js(args.libraries === 'cdn')}
  ${create_quill(
    args.editorId,
    args.toolbar,
    args.placeholder,
    args.theme,
    args.fonts.map((f) => getFontName(f.name))
  )}
  ${editor_js}
  </body>
  </html>
  `;
};
