import { render, screen } from '@testing-library/react';
import App from './App';

function mockWindowApi(send = jest.fn(), on = jest.fn(), removeListener = jest.fn()) {
  window.api = {
    send,
    on,
    removeListener
  };
}

describe('<App />', () => {
  it('subscribes itself to the appState events and unsubscribes from them when unmounted', () => {
    // given a mocked window.api
    const mockedSendFunction = jest.fn();
    const mockedOnFunction = jest.fn();
    const mockedRemoveListenerFunction = jest.fn();
    mockWindowApi(mockedSendFunction, mockedOnFunction, mockedRemoveListenerFunction);
    
    // when the app is rendered
    const { unmount } =render(<App />);
  
    // then the event ui-ready-for-events event was sent
    expect(mockedSendFunction).toHaveBeenCalledWith('ui-ready-for-events');

    // and the app subscried to the events app-init-success and app-init-failure
    expect(mockedOnFunction.mock.calls.length).toBe(2);
    expect(mockedOnFunction.mock.calls[0][0]).toBe('app-init-success');
    expect(mockedOnFunction.mock.calls[1][0]).toBe('app-init-failure');

    // when the component is unmounted
    unmount()

    // then the unsubscribe events are called
    expect(mockedRemoveListenerFunction.mock.calls.length).toBe(2);
    expect(mockedRemoveListenerFunction.mock.calls[0][0]).toBe('app-init-success');
    expect(mockedRemoveListenerFunction.mock.calls[1][0]).toBe('app-init-failure');
  });

  it('Shows the loaddig message while the app waits either for a success or failure event', async () => {
    // given a mocked window.api
    mockWindowApi();
    
    // when the app is rendered
    render(<App />);
  
    // then the Loading text is shown
    expect(await screen.findByText('Loading')).toBeInTheDocument();
  });
});
