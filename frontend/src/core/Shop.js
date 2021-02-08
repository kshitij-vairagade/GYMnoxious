import React, {useState, useEffect } from 'react';
import Layout from "./Layout";
import Card from "./Card";
import {getCategories, getFilteredServices} from './apiCore'
import Checkbox from './Checkbox'
import {fees} from './fixedPrices'
import RadioBox from './Radiobox'


const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], fees: []}
    })
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data=> {
            if(data.error){
                setError(data.error)
            }else{
                setCategories(data)
            }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters)
        getFilteredServices(skip, limit, newFilters).then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0);
            }
        });
    };
    
    const loadMore = () => {
        let toSkip = skip + limit;

        getFilteredServices(toSkip, limit, myFilters.filters).then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setFilteredResults([...filteredResults,...data.data]);
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    };

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>
            )
        )
    }

    useEffect(()=> {
        init();
        loadFilteredResults(skip,limit, myFilters.filters)
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy)
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters;

        if(filterBy === "fees"){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues;
        }

        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    };

    const handlePrice = value => {
        const data = fees;
        let array = [];

        for (let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array;
            }
        }
        return array;
    };

  
    return (
        <Layout 
            title="Shop Page"
            description="Purchase the membership of your favorite gym in the city"
            className="container-fluid"
        >

            <div className="row">
                <div className="col-4">
                    <h4>Filter by Category</h4>
                    <ul>
                    <Checkbox 
                   categories={categories} 
                   handleFilters={filters=> handleFilters(filters, "category")}
                   />
                    </ul>
                    <h4>Filter by Fees Range</h4>
                    <div>
                    <RadioBox 
                        fees={fees} 
                        handleFilters={filters=> handleFilters(filters, "fees")}
                   />
                    </div>
                </div>
                <div className = "col-8">
                   <h2 className="md-4">Services</h2>
                   <div className="row">
                       {filteredResults.map((service,i) => (
                           <div className="col-4 md-3">
                            <Card key={i}  service={service} />
                        </div>   
                       ))}
                   </div>
                   <hr/>
                   {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
}


export default Shop