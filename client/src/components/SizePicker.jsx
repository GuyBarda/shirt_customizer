import { useSnapshot } from 'valtio';
import state from '../store';
import CustomButton from './CustomButton';

function SizePicker() {
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
            <div className="flex-1 flex flex-col gap-[6px]">
                <label className="text-sm">Logo Size</label>
                <input
                    type="range"
                    onChange={({ target }) =>
                        handleChange('size', target.value)
                    }
                    min="11"
                    max="25"
                    value={snap.size * 100}
                />
                <label className="text-sm">Horizontal Position</label>
                <input
                    type="range"
                    onChange={({ target }) =>
                        handleChange('positionX', target.value)
                    }
                    min="-10"
                    max="10"
                    value={snap.positionX * 100}
                />
                <label className="text-sm">Vertical Position</label>
                <input
                    type="range"
                    onChange={({ target }) =>
                        handleChange('positionY', target.value)
                    }
                    min="-30"
                    max="15"
                    value={snap.positionY * 100}
                />
                <div className="mt-auto ">
                    <CustomButton
                        type="filled"
                        title="Default"
                        handleClick={restoreToDefault}
                        customStyles="text-sm font-bold ml-[50%] translate-x-[-50%]"
                    />
                </div>
            </div>
        </div>
    );
}

export default SizePicker;
