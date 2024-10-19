import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Mind.css';
import FestiveDiscountBanner from './FestiveDiscountBanner';

const Mind = () => {
    const [experiments, setExperiments] = useState([]);
    const [observations, setObservations] = useState({});
    const [recordedObservations, setRecordedObservations] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [notification, setNotification] = useState(null);
    const [notificationType, setNotificationType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const experimentsPerPage = 8;

    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const fetchExperiments = async () => {
            try {
                const response = await axios.get('http://localhost:4000/mind');
                setExperiments(response.data);
            } catch (error) {
                console.error('Error fetching experiments:', error);
            }
        };
        fetchExperiments();
    }, []);

    const handleObservationChange = (experimentId, newObservation) => {
        setObservations((prevObservations) => ({
            ...prevObservations,
            [experimentId]: newObservation,
        }));
    };

    const handleRecordObservation = async (experiment) => {
        const observation = observations[experiment._id] || '';

        try {
            await axios.post('http://localhost:4000/mind', {
                experimentId: experiment._id,
                observation,
            });
            setNotification(`Observation recorded for ${experiment.Name}`);
            setNotificationType('success');
        } catch (error) {
            setNotification('Could not record observation. Please try again.');
            setNotificationType('error');
        }

        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    const handleAddToRecord = (experiment) => {
        const observation = observations[experiment._id] || '';
        const record = { ...experiment, observation };

        setRecordedObservations((prevRecords) => {
            const existingRecord = prevRecords.find((item) => item._id === experiment._id);
            if (existingRecord) {
                return prevRecords.map((item) =>
                    item._id === experiment._id
                        ? { ...item, observation: observation }
                        : item
                );
            } else {
                return [...prevRecords, record];
            }
        });

        setNotification(`Observation for ${experiment.Name} added to records.`);
        setNotificationType('success');

        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    const handleClearRecords = () => {
        setRecordedObservations([]);
        setNotification('All records cleared!');
        setNotificationType('success');

        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    const handleToggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    const calculateTotalRecords = () => {
        return recordedObservations.length;
    };

    const indexOfLastExperiment = currentPage * experimentsPerPage;
    const indexOfFirstExperiment = indexOfLastExperiment - experimentsPerPage;

    const filteredExperiments = experiments
        .filter((experiment) =>
            experiment.Name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === 'name') {
                return a.Name.localeCompare(b.Name);
            } else if (sortOption === 'priceLowHigh') {
                return a.salePrice - b.salePrice;
            } else if (sortOption === 'priceHighLow') {
                return b.salePrice - a.salePrice;
            } else {
                return 0;
            }
        });

    const currentExperiments = filteredExperiments.slice(
        indexOfFirstExperiment,
        indexOfLastExperiment
    );
    const totalPages = Math.ceil(filteredExperiments.length / experimentsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="lab-container">
            <div className="lab-header-container">
                <h2 className="lab-header">Relax Your Mind</h2>
                <input
                    type="text"
                    placeholder="Search for a Video"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>

            {notification && (
                <div className={`notification ${notificationType}`}>
                    {notification}
                </div>
            )}

            {isDrawerOpen && <div className="overlay show" onClick={handleCloseDrawer}></div>}

            <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={handleCloseDrawer}>X</button>
                {recordedObservations.length === 0 ? (
                    <p>No recorded observations</p>
                ) : (
                    <ul className="record-items">
                        {recordedObservations.map((item) => (
                            <li key={item._id} className="record-item">
                                <span>{item.Name}</span>
                                <span>Observation: {item.observation}</span>
                            </li>
                        ))}
                    </ul>
                )}
                <button className="clear-records-btn" onClick={handleClearRecords}>
                    Clear Records
                </button>
            </div>

            <div className="experiment-grid">
                {currentExperiments.length === 0 ? (
                    <p>No experiments available at the moment.</p>
                ) : (
                    currentExperiments.map((experiment) => (
                        <div key={experiment._id} className="experiment-card">
                            <a href={experiment.videoUrl} target="_top" rel="noopener noreferrer" className="image-container">
                                <img src={experiment.image} alt={experiment.Name} className="product-image" />
                                <div className="play-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </a>
                            <p className='desc'>{experiment.description}</p>
                        </div>
                    ))
                )}
            </div>

            <div className="pagination">
                <button
                    className="prev-btn"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span className='header1'>Page {currentPage} of {totalPages}</span>
                <button
                    className="next-btn"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Mind;
