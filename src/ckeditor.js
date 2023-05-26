/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { UploadAdapter } from '@ckeditor/ckeditor5-adapter-ckfinder';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CKBox } from '@ckeditor/ckeditor5-ckbox';
import { CKFinder } from '@ckeditor/ckeditor5-ckfinder';
import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageCaption, ImageStyle, ImageToolbar, ImageUpload, PictureEditing } from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';

export default class ClassicEditor extends ClassicEditorBase {
}

class Label extends Plugin {
	init() {
		const editor = this.editor;
		editor.ui.componentFactory.add('label', locale => {
			const view = new ButtonView(locale);
			view.set({
				label: editor.config.get('label'),
				withText: true,
				class: `editor-label ${editor.config.get('required') ? 'required' : ''}`
			});
			return view;
		});
	}
}

class Tags extends Plugin {
	init() {
		const editor = this.editor;
		const tagsOptions = editor.config.get('tags');

		if (!tagsOptions || tagsOptions.length === 0) {
			return false;
		}

		// Register UI component
		editor.ui.componentFactory.add('tags', locale => {

			const dropdownView = createDropdown(locale);

			dropdownView.set({
				tooltip: true
			});

			dropdownView.buttonView.set({
				label: 'Tags',
				isOn: false,
				withText: true,
				tooltip: 'Tags'
			});

			dropdownView.extendTemplate({
				attributes: {
					class: [
						'ck-tags-dropdown'
					]
				}
			});

			// The collection of the list items.
			const items = new Collection();


			//add options
			tagsOptions && tagsOptions.map(item =>
				items.add({
					type: 'button',
					model: new Model({
						id: item,
						label: item.replace(/_/g, ' '),
						withText: true,
					})
				}))

			// Create a dropdown with a list inside the panel.
			addListToDropdown(dropdownView, items);

			dropdownView.on('execute', (eventInfo) => {
				const {id} = eventInfo.source;
				const viewFragment = this.editor.data.processor.toView(`{${id}}`);
				const modelFragment = this.editor.data.toModel(viewFragment);
				editor.model.insertContent(modelFragment);
			});

			return dropdownView;
		});
	}
}

ClassicEditor.builtinPlugins = [
    Essentials,
    UploadAdapter,
    Autoformat,
    Bold,
    Italic,
    BlockQuote,
    EasyImage,
    Heading,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Link,
    List,
    Paragraph,
    Alignment ,
	Tags	
];

// Editor configuration.
ClassicEditor.defaultConfig = {
    toolbar: {
        items: [
            'heading',
            '|',
            'alignment',                                                
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'uploadImage',
            'blockQuote',
            'undo',
            'redo',
			'|',
			'tags'
        ]
    },
    image: {
        toolbar: [
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            '|',
            'toggleImageCaption',
            'imageTextAlternative'
        ]
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'en'
};
