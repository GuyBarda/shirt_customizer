import CustomButton from './CustomButton';
import state from '../store';
import { useSnapshot } from 'valtio';

function FilePicker({ file, setFile, readFile }) {
    const snap = useSnapshot(state);

    const buttons = [
        { type: 'outline', title: 'Logo' },
        { type: 'filled', title: 'Full' },
    ];

    return (
        <div className="filepicker-container">
            <div className="flex-1 flex flex-col">
                <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={({ target }) => setFile(target.files[0])}
                />
                <label
                    htmlFor="file-upload"
                    className="filepicker-input cursor-pointer border w-fit p-1 rounded "
                    style={{ borderColor: snap.color }}
                >
                    {/* <img
                        src={upload}
                        alt="upload"
                        className=" h-4 inline-block pr-1"
                        style={{ fill: snap.color }}
                    /> */}
                    Upload Image
                </label>

                <p
                    className="mt-2 text-white text-sm truncate"
                    style={{ title: file.name }}
                >
                    {!file ? 'No image selected' : file.name}
                </p>

                <div className="mt-auto flex gap-3">
                    {buttons.map(({ type, title }) => (
                        <CustomButton
                            key={type}
                            type={type}
                            title={title}
                            handleClick={() =>
                                readFile(title.toLocaleLowerCase())
                            }
                            customStyles="text-sm font-bold"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FilePicker;
