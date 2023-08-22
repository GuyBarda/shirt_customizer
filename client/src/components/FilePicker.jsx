import CustomButton from './CustomButton';

function FilePicker({ file, setFile, readFile }) {
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
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <label
                    htmlFor="file-upload"
                    className="filepicker-input cursor-pointer underline "
                >
                    Upload File
                </label>

                <p className="mt-2 text-white text-sm truncate">
                    {!file ? 'No file selected' : file.name}
                </p>

                <div className="mt-4 flex gap-3">
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
                    {/* <CustomButton
                        type="outline"
                        title="Logo"
                        handleClick={() => readFile('logo')}
                        customStyles="text-sm"
                    />
                    <CustomButton
                        type="filled"
                        title="Full"
                        handleClick={() => readFile('full')}
                        customStyles="text-sm"
                    /> */}
                </div>
            </div>
        </div>
    );
}

export default FilePicker;
