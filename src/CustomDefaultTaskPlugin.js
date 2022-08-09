import React from 'react';
import { Tab, VERSION, Icon } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import ChatHistoryCanvas from './components/ChatHistoryCanvas';

const historyFile = require("./mock/transcript.json");

const PLUGIN_NAME = 'CustomDefaultTaskPlugin';

export default class CustomDefaultTaskPlugin extends FlexPlugin {
  constructor () {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);

    const Img = <Icon icon="Directory" />;


    const historyChannel = flex.DefaultTaskChannels.createDefaultTaskChannel("HistoryTask", (task) => task.attributes.isHistory == true);

    historyChannel.addedComponents = [
      {
        target: "TaskCanvasTabs",
        component: <Tab icon={Img} iconActive={Img} label="History" key="my-new-tab" hidden={false}>
          <ChatHistoryCanvas key="ChatHistoryCanvas" transcript={historyFile.channels[0]} />
        </Tab>,
        options: { sortOrder: -1 }
      }
    ]

    flex.TaskChannels.register(historyChannel)

    flex.Actions.addListener("beforeTransferTask", (payload, original) => {
      if (!TaskHelper.isChatBasedTask(payload.task)) {
        return original(payload);
      }

      // creates new task
    })
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    // manager.store.addReducer(namespace, reducers);
  }
}
