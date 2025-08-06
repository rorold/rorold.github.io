import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
//import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default function (eleventyConfig) {
	// Output directory: _site

	// Copy `img/` to `_site/img/`
	eleventyConfig.addPassthroughCopy("img");

	// Copy `css/fonts/` to `_site/css/fonts/`
	// Keeps the same directory structure.
//	eleventyConfig.addPassthroughCopy("css/fonts");

	// Copy any .jpg file to `_site`, via Glob pattern
	// Keeps the same directory structure.
	eleventyConfig.addPassthroughCopy("**/*.jpg");
	
	// Watch CSS files
	eleventyConfig.addWatchTarget("**/*.css");
	
	eleventyConfig.addPassthroughCopy("bundle.css");
	
	eleventyConfig.addPlugin(eleventyNavigationPlugin);
	
// Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
	// eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// // Output formats for each image.
		// formats: ["avif", "webp", "auto"],

		// // widths: ["auto"],

		// failOnError: false,
		// htmlOptions: {
			// imgAttributes: {
				// // e.g. <img loading decoding> assigned on the HTML tag will override these values.
				// loading: "lazy",
				// decoding: "async",
			// }
		// },

		// sharpOptions: {
			// animated: true,
		// },
	// });
};