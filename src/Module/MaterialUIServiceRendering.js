import React from 'react';
//material-ui 服务端渲染 删除服务端渲染的css
export class RemoveServerSideCss extends React.Component {
	// Remove the server-side injected CSS.
	componentDidMount() {
	  const jssStyles = document.getElementById('jss-server-side');
	  if (jssStyles && jssStyles.parentNode) {
	    jssStyles.parentNode.removeChild(jssStyles);
	  }
	}
	render() {
	  return this.props.children
	}
}
