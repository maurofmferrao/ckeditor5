/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* globals console:false, window, document, CKEditorInspector */

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { CodeBlock } from '@ckeditor/ckeditor5-code-block';
import { EasyImage } from '@ckeditor/ckeditor5-easy-image';
import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageUpload, ImageInsert } from '@ckeditor/ckeditor5-image';
import { Link, LinkImage } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Table } from '@ckeditor/ckeditor5-table';

import Bookmark from '../../src/bookmark.js';

import { CS_CONFIG } from '@ckeditor/ckeditor5-cloud-services/tests/_utils/cloud-services-config.js';

const config = {
	plugins: [
		Essentials, Link, List, LinkImage, Paragraph, Table, Image, ImageUpload, CodeBlock,
		BlockQuote, EasyImage, CloudServices, ImageInsert, Heading, Bold, Italic, Bookmark
	],
	toolbar: [
		'bookmark', '|',
		'undo', 'redo', '|',
		'heading', '|',
		'bold', 'italic', '|',
		'link', 'insertImage', 'insertTable', 'codeBlock', 'blockQuote', '|',
		'bulletedList', 'numberedList'
	],
	cloudServices: CS_CONFIG,
	menuBar: {
		isVisible: true
	}
};

const { plugins, ...configWithoutPlugins } = config;

ClassicEditor
	.create( document.querySelector( '#editor' ), config )
	.then( editor => {
		window.editor = editor;
		CKEditorInspector.attach( { editor } );
	} )
	.catch( err => {
		console.error( err.stack );
	} );

ClassicEditor
	.create( document.querySelector( '#editor-wrapped-anchors-not-allowed' ),
		{
			...config,
			bookmark: {
				enableNonEmptyAnchorConversion: false
			}
		} )
	.then( editor => {
		window.editor_wrapped_anchors_not_allowed = editor;
		CKEditorInspector.attach( { editor_wrapped_anchors_not_allowed: editor } );
	} )
	.catch( err => {
		console.error( err.stack );
	} );

ClassicEditor
	.create( document.querySelector( '#editor-with-ghs' ), {
		...configWithoutPlugins,
		plugins: [
			...plugins,
			GeneralHtmlSupport
		],
		htmlSupport: {
			allow: [
				{
					name: /^.*$/,
					styles: true,
					attributes: true,
					classes: true
				}
			]
		}
	} )
	.then( editor => {
		window.editor_ghs = editor;
		CKEditorInspector.attach( { editor_ghs: editor } );
	} )
	.catch( err => {
		console.error( err.stack );
	} );

ClassicEditor
	.create( document.querySelector( '#editor-with-ghs-wrapped-anchors-not-allowed' ),
		{
			...configWithoutPlugins,
			plugins: [
				...plugins,
				GeneralHtmlSupport
			],
			bookmark: {
				enableNonEmptyAnchorConversion: false
			},
			htmlSupport: {
				allow: [
					{
						name: /^.*$/,
						styles: true,
						attributes: true,
						classes: true
					}
				]
			}
		} )
	.then( editor => {
		window.editor_ghs_wrapped_anchors_not_allowed = editor;
		CKEditorInspector.attach( { editor_ghs_wrapped_anchors_not_allowed: editor } );
	} )
	.catch( err => {
		console.error( err.stack );
	} );

ClassicEditor
	.create( document.querySelector( '#editor-rtl' ),
		{
			...config,
			language: 'ar'
		} )
	.then( editor => {
		window.editor_rtl = editor;
		CKEditorInspector.attach( { editor_rtl: editor } );
	} )
	.catch( err => {
		console.error( err.stack );
	} );
