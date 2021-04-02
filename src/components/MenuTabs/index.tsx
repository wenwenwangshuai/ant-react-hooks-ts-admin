import React from 'react';
import { Tabs, Dropdown, Menu } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import { MenuProps } from 'antd/lib/menu';
import styles from './index.less';

const { TabPane } = Tabs;

const closeCurrentTabMenuKey = 'closeCurrent';
const closeOthersTabMenuKey = 'closeOthers';
const closeToRightTabMenuKey = 'closeToRight';

export interface MenuTab<T = any> {
  /** tab's title */
  tab: string;
  key: string;
  content: JSX.Element;
  closable?: boolean;
  /** used to indicate the tab need refresh */
  refresh?: boolean;
  /** used to extends tab's properties */
  extraTabProperties?: T;
}

export interface MenuTabsProps {
  activeKey: string;
  tabs: MenuTab[];
  onSwitch: (keyToSwitch: string) => void;
  onRemove: (removeKey: string) => void;
  onRemoveOthers: (currentKey: string) => void;
  onRemoveRightTabs: (currentKey: string) => void;
  tabsProps?: TabsProps;
}

export default class extends React.Component<MenuTabsProps> {
  handleTabEdit = (targetKey: string, action: string) => {
    this[action](targetKey);
  };

  remove = (key: string) => {
    const { onRemove = () => { } } = this.props;
    onRemove(key);
  };

  handleTabsMenuClick = (tabKey: string): MenuProps['onClick'] => event => {
    const { onRemove, onRemoveOthers, onRemoveRightTabs } = this.props;
    const { key } = event;

    if (key === closeCurrentTabMenuKey) {
      onRemove(tabKey);
    } else if (key === closeOthersTabMenuKey) {
      onRemoveOthers(tabKey);
    } else if (key === closeToRightTabMenuKey) {
      onRemoveRightTabs(tabKey);
    }
  };

  render() {
    const { tabsProps, onSwitch, tabs, activeKey } = this.props;
    const setMenu = (key: string, index: number) => (
      <Menu onClick={this.handleTabsMenuClick(key)}>
        {/* <Menu.Item disabled={tabs.length === 1} key={closeCurrentTabMenuKey}>
          关闭标签页
        </Menu.Item> */}
        <Menu.Item disabled={tabs.length === 1} key={closeOthersTabMenuKey}>
          关闭其它标签页
        </Menu.Item>
        <Menu.Item disabled={tabs.length === index + 1} key={closeToRightTabMenuKey}>
          关闭右侧标签页
        </Menu.Item>
      </Menu>
    );

    const setTab = (tab: string, key: string, index: number) => (
      <span onContextMenu={event => event.preventDefault()}>
        <Dropdown overlay={setMenu(key, index)} trigger={['contextMenu']}>
          <span className={styles.tabTitle}>{tab}</span>
        </Dropdown>
      </span>
    );

    // {activeKey === item.key && item.content} tabs刷新
    const renderTabs = () =>
      !!tabs.length &&
      tabs.map((item: MenuTab, index) => (
        <TabPane tab={setTab(item.tab, item.key, index)} key={item.key} closable={item.closable}>
          {item.content}
        </TabPane>
      ));

    return (
      <Tabs
        tabPosition="top"
        type="editable-card"
        tabBarStyle={{ margin: 0 }}
        tabBarGutter={0}
        hideAdd
        {...tabsProps}
        activeKey={activeKey}
        onEdit={this.handleTabEdit}
        onChange={onSwitch}
      >
        {renderTabs()}
      </Tabs>
    );
  }
}
