/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// The editor creator to use.
import ClassicEditorBase from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';

// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import List from '@ckeditor/ckeditor5-list/src/list';
import Font from '@ckeditor/ckeditor5-font/src/font';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import { createDropdown, addListToDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import {Link} from "@ckeditor/ckeditor5-link";

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

// Editor configuration.
ClassicEditor.defaultConfig = {
	plugins: [Essentials, Bold, Italic, Underline, Heading, List, Font, RemoveFormat, Alignment, Label, Tags, Link],
	toolbar: ['label', '|', 'heading', '|', 'fontColor', 'fontBackgroundColor', '|', 'bold', 'italic', 'underline', '|', 'link', '|', 'bulletedList', 'numberedList', 'removeFormat', 'Alignment', '|', 'tags']
};

