import AbstractView from '../framework/view/abstract-view';

const createNoPointsTemplate = () => (
  `<p class="board__no-tasks">
    Loading...
  </p>`
);

export default class LoadingView extends AbstractView {
  get template() {
    return createNoPointsTemplate();
  }
}
