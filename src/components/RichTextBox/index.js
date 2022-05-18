import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { StyleCont } from "./style";

class RichTextBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: EditorState.createEmpty(),
      value: "",
      error: false,
      flag: true,
    };
  }
  componentDidMount() {
    const { value } = this.props;
    value && this.setEditor(value);
  }
  componentDidUpdate(prevProps) {
    try {
      const { className, value } = this.props;
      if (value !== prevProps.value && this.state.flag) this.setEditor(value);
      if (className !== prevProps.className)
        this.setState({ error: className === "empty" });
    } catch (error) {
      console.log("DidUpdate", error);
    }
  }
  setEditor = (val) => {
    try {
      let txt = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(val.trim() !== "" ? val : "")
        )
      );
      this.setState({ editor: txt, flag: false });
    } catch (error) {
      console.log("setEditor", error);
    }
  };
  handleEditor = (editorState) => {
    try {
      const { type } = this.props;
      let val = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      let tx = val.replace(/&nbsp;/g, "");
      tx = tx.replace(/\n/g, "");
      tx = tx.replace(/(<([^>]+)>)/gi, "");
      this.setState({
        editor: editorState,
        value: val,
        error: (type !== "Package" || type !== "blog") && tx === "",
      });
      this.props.changeTxt(tx !== "" ? val : "");
    } catch (error) {
      console.log("handleEditor", error);
    }
  };
  render() {
    const { editor, error } = this.state;
    return (
      <StyleCont>
        <Editor
          editorState={editor}
          onEditorStateChange={this.handleEditor}
          wrapperClassName={error ? "empty" : ""}
        />
      </StyleCont>
    );
  }
}
export default RichTextBox;
