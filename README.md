# react-editor

> CKEditor5 with tags insert from dropdown


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



