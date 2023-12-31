import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import state from '../store';
import config from '../config/config';

import AIPicker from '../components/AIPicker';
import ColorPicker from '../components/ColorPicker';
import CustomButton from '../components/CustomButton';
import FilePicker from '../components/FilePicker';
import SizePicker from '../components/SizePicker';
import Tab from '../components/Tab';

const Customizer = () => {
    const snap = useSnapshot(state);

    const [file, setFile] = useState('');
    const [prompt, setPrompt] = useState('');
    const [generatingImg, setGeneratingImg] = useState(false);
    const [activeEditorTab, setActiveEditorTab] = useState('');
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt: true,
        stylishShirt: false,
    });

    const generateTabContent = () => {
        switch (activeEditorTab) {
            case 'colorpicker':
                return <ColorPicker />;
            case 'sizepicker':
                return <SizePicker />;
            case 'filepicker':
                return (
                    <FilePicker
                        file={file}
                        setFile={setFile}
                        readFile={readFile}
                    />
                );
            case 'aipicker':
                return (
                    <AIPicker
                        prompt={prompt}
                        setPrompt={setPrompt}
                        generatingImg={generatingImg}
                        handleSubmit={handleSubmit}
                    />
                );
            default:
                return null;
        }
    };

    const handleSubmit = async (type) => {
        if (true) alert('Currently under development, please be patient');
        if (!prompt) return alert('Please enter a prompt');

        try {
            setGeneratingImg(true);

            const response = await fetch(config.development.backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();
            handleDecals(type, `data:image/png;base64,${data.photo}`);
        } catch (error) {
            alert(error);
        } finally {
            setGeneratingImg(false);
            setActiveEditorTab('');
        }
    };

    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];
        state[decalType.stateProperty] = result;

        if (!activeFilterTab[decalType.filterTab])
            handleActiveFilterTab(decalType.filterTab);
    };

    const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
            case 'logoShirt':
                state.isLogoTexture = !activeFilterTab[tabName];
                break;
            case 'stylishShirt':
                state.isFullTexture = !activeFilterTab[tabName];
                break;
            default:
                state.isLogoTexture = true;
                state.isFullTexture = false;
                break;
        }

        setActiveFilterTab((prevState) => ({
            ...prevState,
            [tabName]: !prevState[tabName],
        }));
    };

    const readFile = async (type) => {
        if (!file || !file.type.includes('image'))
            return alert('Please upload an image file');
        const res = await reader(file);
        handleDecals(type, res);
        setActiveEditorTab('');
    };

    return (
        <AnimatePresence>
            {!snap.intro && (
                <>
                    <motion.div
                        key="custom"
                        className="absolute top-0 left-0 z-10"
                        {...slideAnimation('left')}
                    >
                        <div className="flex items-center min-h-screen">
                            <div className="editortabs-container tabs">
                                {EditorTabs.map((tab) => (
                                    <Tab
                                        key={tab.name}
                                        tab={tab}
                                        handleClick={() =>
                                            setActiveEditorTab(
                                                activeEditorTab === tab.name
                                                    ? ''
                                                    : tab.name
                                            )
                                        }
                                    />
                                ))}

                                {generateTabContent()}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="absolute z-10 top-5 right-5"
                        {...fadeAnimation}
                    >
                        <CustomButton
                            type="filled"
                            title="Go Back"
                            handleClick={() => (state.intro = true)}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </motion.div>
                    {/* <motion.div
                        className="absolute z-10 top-5 left-1/2 translate-x-[-50%]"
                        {...fadeAnimation}
                    >
                        <CustomButton
                            type="filled"
                            title="Want to customize you own shoe?"
                            handleClick={() => (state.intro = true)}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm rounded-lg"
                        />
                    </motion.div> */}

                    <motion.div
                        className="filtertabs-container"
                        {...slideAnimation('up')}
                    >
                        {FilterTabs.map((tab) => (
                            <div className="floater-container flex justify-center">
                                <Tab
                                    key={tab.name}
                                    tab={tab}
                                    isFilterTab
                                    isActiveTab={activeFilterTab[tab.name]}
                                    handleClick={() =>
                                        handleActiveFilterTab(tab.name)
                                    }
                                />
                                <div className="filtertabs-floater">
                                    Toggle the{' '}
                                    {tab.name.includes('logo')
                                        ? 'logo'
                                        : 'background'}{' '}
                                    of the shirt
                                </div>
                            </div>
                        ))}
                        <button
                            className="download-btn"
                            onClick={downloadCanvasToImage}
                        >
                            <img
                                src={download}
                                alt="download"
                                className="w-3/5 h-3/5 object-contain"
                            />
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Customizer;
