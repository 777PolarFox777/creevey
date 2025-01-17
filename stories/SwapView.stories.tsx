import React from 'react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { fireEvent, within } from '@storybook/testing-library';
import { ImagesView as ImagesViewBase } from '../src/client/shared/components/ImagesView';
import { capture } from '../src/client/addon/withCreevey';

const SwapView = (image: { expect: string; diff: string; actual: string }): JSX.Element => (
  <ImagesViewBase image={image} url="https://images.placeholders.dev" canApprove mode={'swap'} />
);

async function play({
  canvasElement,
}: Parameters<NonNullable<ComponentStoryObj<typeof SwapView>['play']>>['0']): Promise<void> {
  await capture({ imageName: 'actual' });

  const diffImage = await within(canvasElement).findByAltText('diff');
  fireEvent.click(diffImage);

  await capture({ imageName: 'expect' });
}

export default {
  title: 'SwapView',
  component: SwapView,
  parameters: {
    creevey: {
      waitForReady: true,
      captureElement: '#root > *',
    },
  },
} as ComponentMeta<typeof SwapView>;

export const _100x100_vs_100x100: ComponentStoryObj<typeof SwapView> = {
  play,
  args: {
    expect: '?width=100&height=100',
    diff: '?width=100&height=100',
    actual: '?width=100&height=100',
  },
};

export const _100x100_vs_2000x100: ComponentStoryObj<typeof SwapView> = {
  play,
  args: {
    expect: '?width=100&height=100',
    diff: '?width=2000&height=100',
    actual: '?width=2000&height=100',
  },
};

export const _100x100_vs_100x2000: ComponentStoryObj<typeof SwapView> = {
  play,
  args: {
    expect: '?width=100&height=100',
    diff: '?width=100&height=2000',
    actual: '?width=100&height=2000',
  },
};

export const _100x100_vs_2000x2000: ComponentStoryObj<typeof SwapView> = {
  play,
  args: {
    expect: '?width=100&height=100',
    diff: '?width=2000&height=2000',
    actual: '?width=2000&height=2000',
  },
};

export const _2000x100_vs_100x2000: ComponentStoryObj<typeof SwapView> = {
  play,
  args: {
    expect: '?width=2000&height=100',
    diff: '?width=2000&height=2000',
    actual: '?width=100&height=2000',
  },
};

export const _2000x100_vs_2000x2000: ComponentStoryObj<typeof SwapView> = {
  play,
  args: {
    expect: '?width=2000&height=100',
    diff: '?width=2000&height=2000',
    actual: '?width=2000&height=2000',
  },
};

export const _100x2000_vs_2000x2000: ComponentStoryObj<typeof SwapView> = {
  play,
  args: {
    expect: '?width=100&height=2000',
    diff: '?width=2000&height=2000',
    actual: '?width=2000&height=2000',
  },
};

export const _2000x2000_vs_2000x2000: ComponentStoryObj<typeof SwapView> = {
  play,
  args: {
    expect: '?width=2000&height=2000',
    diff: '?width=2000&height=2000',
    actual: '?width=2000&height=2000',
  },
};
