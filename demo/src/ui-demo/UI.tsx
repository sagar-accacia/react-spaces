import * as React from 'react';
import * as Space from 'react-spaces';
import 'antd/dist/antd.css';
import './UI.scss';
import MonacoEditor from 'react-monaco-editor';
import { CenterType } from 'react-spaces';

export const UI = () => {
	return (
			<Space.ViewPort className="ui-demo">
				<Header />
				<Main />
			</Space.ViewPort>
	)
}

const Header = () => {
	return (
		<Space.Top className="title-bar" centerContent={CenterType.HorizontalVertical} size={30} style={{ backgroundColor: '#333', color: '#c5c5c5' }}>
			<Space.Left className="menu-bar">

			</Space.Left>
			UI Demo - Example UI interface
		</Space.Top>
	)
}

const Main = () => {
	const [ sidebarVisible, setSidebarVisible ] = React.useState(true);
	const [ sidebarWide, setSidebarWide ] = React.useState(false);

	return (
		<Space.Fill style={{ backgroundColor: '#1E1E1E' }}>
			<Space.Fill>
				<IconPane />
				<SideBar wide={sidebarWide} visible={sidebarVisible} />
				<Editor toggleSize={() => setSidebarWide(!sidebarWide)} toggleVisibility={() => setSidebarVisible(!sidebarVisible)} />
			</Space.Fill>
		</Space.Fill>
	)
}

const Editor : React.FC<{ toggleVisibility: () => void, toggleSize: () => void }> = (props) => {
	const [ code, setCode ] = React.useState('import * as React from \'react\';\r\nimport * as Space from \'react-spaces\';\r\n\r\nexport const App = () => {\r\n    <Space.ViewPort>\r\n        <Space.Top size={30}>\r\n            Hello!\r\n        </Space.Top>\r\n        <Space.Fill>\r\n            World!\r\n        </Space.Fill>\r\n    </Space.ViewPort>\r\n}');

    const options = {
		selectOnLineNumbers: true,
		automaticLayout: true
	};

	return  (
		<Space.Fill>
			<Space.Fill>
				<Space.Top className="editor-tabs" size={40}>
				</Space.Top>
				<Space.Fill className="editor-main">
					<MonacoEditor
						value={code} 
						onChange={(newValue: string) => setCode(newValue)} 
						options={options}
						language="javascript" 
						theme="vs-dark" />
				</Space.Fill>
			</Space.Fill>
			<BottomPane toggleSize={props.toggleSize} toggleVisibility={props.toggleVisibility} />
		</Space.Fill>
	)
}

const IconPane = () => {
	return (
		<Space.Left order={1} className="side-bar-icons" size={50} style={{ backgroundColor: '#333' }}>
		</Space.Left>
	)
}

const SideBar : React.FC<{ wide: boolean, visible: boolean }> = (props) => {
	return (
		props.visible ?
		<Space.LeftResizable order={2} className="side-bar" size={props.wide ? 500 : 300} handleSize={2} overlayHandle={false} style={{ backgroundColor: '#252526' }}>
			<SideBarPane order={1} title="Open editors" height={200}>

			</SideBarPane>
			<SideBarPane order={2} title="Demo" height={300}>
				
			</SideBarPane>
			<SideBarPane fill={true} title="Outline">
				
			</SideBarPane>
		</Space.LeftResizable> :
		null
	)
}

const SideBarPane: React.FC<{ order?: number, title: string, height?: number, fill?: boolean }> = (props) => {
	return (
		props.fill ?
			<Space.Fill className="sidebar-pane">
				<SideBarPaneInner title={props.title}>{props.children}</SideBarPaneInner>
			</Space.Fill>
			:
			<Space.TopResizable className="sidebar-pane" order={props.order} size={props.height}>
				<SideBarPaneInner title={props.title}>{props.children}</SideBarPaneInner>
			</Space.TopResizable>
	)
}

const SideBarPaneInner: React.FC<{ title: string }> = (props) => {
	return (
		<>
			<Space.Top className="title" size={28} style={{ backgroundColor: '#383838', color: '#c5c5c5' }}>
				<Space.CenteredVertically>
					{props.title}
				</Space.CenteredVertically>
			</Space.Top>
			<Space.Fill className="content">
				{props.children}
			</Space.Fill>
		</>
	)
}

const BottomPane : React.FC<{ toggleVisibility: () => void, toggleSize: () => void }> = (props) => {
	return (
		<Space.BottomResizable className="bottom-pane" size="25%" handleSize={2} centerContent={Space.CenterType.HorizontalVertical}>
			<button onClick={props.toggleVisibility}>Toggle sidebar visibility</button>
			<button onClick={props.toggleSize}>Toggle sidebar size</button>
		</Space.BottomResizable>
	)
}