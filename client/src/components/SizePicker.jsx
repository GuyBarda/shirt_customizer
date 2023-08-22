import { useSnapshot } from 'valtio';
import state from '../store';
import CustomButton from './CustomButton';

function SizePicker({ handleSubmit }) {
    const snap = useSnapshot(state);

    const handleChange = (type, value) => {
        state[type] = +value / 100;
    };

    const restoreToDefault = () => {
        state.size = 0.15;
        state.positionX = 0;
        state.positionY = 0;
    };
    return (
        <div className="sizepicker-container">
            <label>Logo Size</label>
            <input
                type="range"
                onChange={({ target }) => handleChange('size', target.value)}
                min="5"
                max="25"
                value={snap.size * 100}
            />
            <label>X-Axis</label>
            <input
                type="range"
                onChange={({ target }) =>
                    handleChange('positionX', target.value)
                }
                min="-10"
                max="10"
                value={snap.positionX * 100}
            />
            <label>Up Down</label>
            <input
                type="range"
                onChange={({ target }) =>
                    handleChange('positionY', target.value)
                }
                min="-30"
                max="15"
                value={snap.positionY * 100}
            />
            <CustomButton
                type="filled"
                title="Default"
                handleClick={restoreToDefault}
                customStyles="text-sm font-bold"
            />
        </div>
    );
}

export default SizePicker;
