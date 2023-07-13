import App from './javascript/App';
import SeasonModal from './javascript/components/modals/SeasonModal';
import SeasonScheduleModal from './javascript/components/modals/SeasonScheduleModal';
import './index.scss';

const app = App();
const seasonModal = SeasonModal();
const seasonScheduleModal = SeasonScheduleModal();

document.querySelector('body').appendChild(app);
document.querySelector('body').appendChild(seasonModal);
document.querySelector('body').appendChild(seasonScheduleModal);
