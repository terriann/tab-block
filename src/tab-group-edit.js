/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { SelectControl , Panel, PanelBody, PanelRow } from '@wordpress/components';

const ALLOWED_BLOCKS = [ 'tab-group/tab' ];

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import './tab.js';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

 export default function edit( props ) {

	const {
		attributes,
		setAttributes,

	} = props;
	const { tabLabelsArray, updateChild, tabLayout } = attributes;

	const buildTabLabelsArray = () =>{
		//function gets child block attributes and saves as an array to parent attributes
		const parentBlockID = props.clientId;
		const { innerBlockCount } = useSelect(select => ({
			innerBlockCount: select('core/block-editor').getBlockCount(parentBlockID)
		}));

		var tabLabels = [];

		for (let block = 0; block < innerBlockCount; block++) {
			let tabLabel = wp.data.select( 'core/block-editor' ).getBlocks( parentBlockID )[block].attributes.tabLabel;
			tabLabels.push(tabLabel);
		}

		return tabLabels;
	}

	var labelsArray = buildTabLabelsArray();
	var labelLengthChange = labelsArray.length !== tabLabelsArray.length;

	if( labelLengthChange || updateChild ){
		setAttributes ({ tabLabelsArray: labelsArray  });
		setAttributes ({ updateChild: false });
	}

	const setTabLayout = value => {
		setAttributes({ tabLayout: value });
	};

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<Panel>
					<PanelBody title="Layout" initialOpen={ true }>
						<PanelRow><SelectControl
						label="Tab Layout"
						value={ tabLayout }
						options={ [
							{ label: 'Top', value: 'top' },
							{ label: 'Left Side', value: 'left' },
						] }
						onChange={ ( tabLayout ) => setTabLayout( tabLayout ) }
						__nextHasNoMarginBottom
					/></PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>

			<InnerBlocks
				allowedBlocks={ ALLOWED_BLOCKS }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
			/>
		</div>
	);
}
