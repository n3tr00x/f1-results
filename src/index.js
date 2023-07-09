import App from './javascript/App';
import SeasonModal from './javascript/components/SeasonModal';
import SeasonScheduleModal from './javascript/components/SeasonScheduleModal';
import './styles/main.scss';

const app = App();
const seasonModal = SeasonModal();
const seasonScheduleModal = SeasonScheduleModal();

document.querySelector('body').appendChild(app);
document.querySelector('body').appendChild(seasonModal);
document.querySelector('body').appendChild(seasonScheduleModal);
