import SVGTranslator from 'svg-scaler-viewbox/lib/SVGTranslator';
import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';

const schema = {
  type: 'object',
  properties: {
    noSvgo: {
      type: 'boolean',
    },
    width: {
      type: 'number',
    },
    scale: {
      type: 'number',
    },
  },
};

export default function SvgScalerLoader(source) {
  const options = getOptions(this);

  validateOptions(schema, options, 'Webpack SVG scaler Loader');

  const callback = this.async();
  const svgTranslator = new SVGTranslator(options);
  svgTranslator
    .parser(source)
    .then(data => {
      callback(null, data);
    })
    .catch(callback);
}
