# react-ckeditor5-with-tags

> CKEditor5 with tags insert from dropdown

[![NPM](https://img.shields.io/npm/v/react-ckeditor5-with-tags.svg)](https://www.npmjs.com/package/ckeditor5-with-tags) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-ckeditor5-with-tags
```

## Usage

```jsx
import React, { Component } from 'react'

import {CKEditor} from '@ckeditor/ckeditor5-react';
import Editor from 'react-ckeditor5-with-tags';

const TextEditor = ({value, onChange, label, required, disabled, error, tags, readOnly}) => {

  return (
    <div className={`ckeditor-container ${error ? 'with-error' : ''}`}>
      <CKEditor
        editor={Editor}
        config={{label, tags, required, readOnly, disabled}}
        data={value}
        onReady={editor => {
          if (readOnly || disabled)
            editor.isReadOnly = true
        }}
        onChange={(event, editor) => {
          onChange(editor.getData());
        }}
      />
    </div>
  );
};
```

## Screenshot

![img](https://raw.githubusercontent.com/alex90badea/react-ckeditor5-with-tags/master/screenshot.jpg)

