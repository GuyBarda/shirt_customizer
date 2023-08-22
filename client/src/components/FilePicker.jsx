import CustomButton from './CustomButton';

function FilePicker({ file, setFile, readFile }) {
    const buttons = [
        { type: 'outline', title: 'Logo' },
        { type: 'filled', title: 'Full' },
    ];

    const getFileName = () => (!file ? 'No file selected' : file.name);

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
                    className="filepicker-input cursor-pointer underline"
                >
                    Upload File
                </label>

                <p
                    className="mt-2 text-white text-sm truncate"
                    title={getFileName()}
                >
                    {getFileName()}
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
