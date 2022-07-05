
import './index.css';
import React from 'react';
import DownloadLink from "react-download-link";
import {CompositeDecorator,Editor, EditorState, RichUtils,Modifier} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { stateToHTML } from "draft-js-export-html";


const Link = ({ entityKey, contentState, children }) => {
    let { url } = contentState.getEntity(entityKey).getData();
    return (
        <a
            style={{ color: "blue", fontStyle: "italic" }}
            href={url}
            target="_blank"
        >
            {children}
        </a>
    );
};
const createLinkDecorator = () =>new CompositeDecorator([
    {
        strategy: findLinkEntities,
        component: Link,
    },
]);
const onAddLink = (editorState, setEditorState) => {
    let linkUrl = window.prompt("Add link http:// ");
    const decorator = createLinkDecorator();
    if (linkUrl) {
        let displayLink = window.prompt("Display Text");
        if (displayLink) {
            const currentContent = editorState.getCurrentContent();
            const createEntity = currentContent.createEntity("LINK", "MUTABLE", {
                url: linkUrl,
            });
            let entityKey = currentContent.getLastCreatedEntityKey();
            const selection = editorState.getSelection();
            const textWithEntity = Modifier.insertText(
                currentContent,
                selection,
                displayLink,
                null,
                entityKey
            );
            let newState = EditorState.createWithContent(textWithEntity, decorator);
            setEditorState(newState);
        }
    }
};
const findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return (
            entityKey !== null &&
            contentState.getEntity(entityKey).getType() === "LINK"
        );
    }, callback);
};

function Constructor() {
    const [editorState, setEditorState] = React.useState(
      () => EditorState.createEmpty(),
    );
    const [TitleHtml, setTitleHtml] = React.useState("Document");
    const BLOCK_TYPES = [
        {label: 'H1', style: 'header-one'},
        {label: 'H2', style: 'header-two'},
        {label: 'H3', style: 'header-three'},
        {label: 'H4', style: 'header-four'},
        {label: 'H5', style: 'header-five'},
        {label: 'H6', style: 'header-six'},
        {label: 'Blockquote', style: 'blockquote'},
        {label: 'Не нумерованный список', style: 'unordered-list-item'},
        {label: 'Нумерованный список', style: 'ordered-list-item'},
        {label: 'Код', style: 'code-block'},
    ]; 
    var INLINE_STYLES = [
        {label: 'Жирный', style: 'BOLD'},
        {label: 'Italic', style: 'ITALIC'},
        {label: 'Подчёркнутый', style: 'UNDERLINE'},
        {label: 'Monospace', style: 'CODE'},
    ];
    function GenHtml() {
        var ReturnHtml=`<!DOCTYPE html>`+
        `<html lang="en">`+
        `<head>`+
          `<meta charset="UTF-8">`+
          `<meta http-equiv="X-UA-Compatible" content="IE=edge">`+
          `<meta name="viewport" content="width=device-width, initial-scale=1.0">`+
          `<title>${TitleHtml}</title>`+
        `</head>`+
        `<body>`;
        ReturnHtml+=stateToHTML(editorState.getCurrentContent());
        ReturnHtml+=`</body></html>`;
        return ReturnHtml;
    }
    var blockType = editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getStartKey())
      .getType();

    const styleMap = {
        
    };
    var currentStyle = editorState.getCurrentInlineStyle();
    return (
        <>
            <DownloadLink
                label="Скачать HTML"
                filename="index.html"
                exportFile={() => Promise.resolve(GenHtml())}
            />
            <input className="Container-Constructor-Edit-Title" onChange={(e)=>{setTitleHtml(e.target.value)}} value={TitleHtml} placeholder="Title страницы"/><br />
            <div className={`Container-Constructor-Edit`}>

                <div>
                    <div className="RichEditor-controls">
                        {BLOCK_TYPES.map((type) =>
                            <button 
                                key={type.label}
                                className={type.style === blockType?"RichEditor-activeButton":"RichEditor-styleButton"}
                                onClick={()=>{setEditorState(RichUtils.toggleBlockType(editorState, type.style))}}
                            >{type.label}</button>
                        )}
                        <button
                            onClick={() => onAddLink(editorState, setEditorState)}
                        >
                            Ссылка
                        </button>
                    </div>
                    <div className="RichEditor-controls">
                        {INLINE_STYLES.map(type =>
                            <button 
                                key={type.label}
                                className={currentStyle.has(type.style)?"RichEditor-activeButton":"RichEditor-styleButton"}
                                onClick={()=>{setEditorState(RichUtils.toggleInlineStyle(editorState, type.style))}}
                                // style={type.style}
                            >{type.label}</button>
                        )}
                    </div>
                </div>
                <Editor 
                    customStyleMap={styleMap}
                    editorState={editorState} 
                    onChange={setEditorState} 
                />
            </div>
        </>
    );
}
export default Constructor;