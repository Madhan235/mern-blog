import { Button, Select, TextInput } from 'flowbite-react'
 
import { useEffect, useState } from 'react'
import { useLocation , useNavigate} from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
    const [sidebarData,setSidebarData] = useState({
        searchTerm:'',
        sort:'desc',
        category:'uncategorized',
    });
    const location = useLocation();
    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(false);
    const [showMore,setShowMore] = useState(false);

     const navigate = useNavigate();

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        
        if(searchTermFromUrl || sortFromUrl || categoryFromUrl){
            setSidebarData({
                ...sidebarData,
                searchTerm : searchTermFromUrl,
                sort : sortFromUrl,
                category : categoryFromUrl
            })
        }

        const fetchPosts = async()=>{
            const searchQuery = urlParams.toString();
           try {
            setLoading(true);
            const res = await fetch(`/api/post/getposts?${searchQuery}`);
            const data = await res.json();

            if(!res.ok){
                setLoading(false);
                return 
            }
            if(res.ok){
                setLoading(false);
                setPosts(data.posts);

                if(data.posts.length === 9){
                    setShowMore(true);
                }
            }
           } catch (error) {
            console.log(error.message);
           }

        }

        fetchPosts();

    },[location.search]);

    const handleChange = (e)=>{
       if(e.target.id === 'searchTerm'){
        setSidebarData({...sidebarData, searchTerm:e.target.value})
       }
       if(e.target.id === 'sort'){
          
        setSidebarData({...sidebarData,sort: e.target.value || 'desc'})
       }
       if(e.target.id === 'category'){
        
        setSidebarData({...sidebarData,category : e.target.value || 'uncategorized'})
       }
    }
console.log(posts);
    const handleSubmit = (e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm',sidebarData.searchTerm)
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('category',sidebarData.category)

        const searchQuery = urlParams.toString()

        navigate(`/search?${searchQuery}`)
         
    }

    const handleShowMore = async ()=>{
         const startIndex = posts.length;
         const urlParams = new URLSearchParams(location.search);
         urlParams.set('startIndex',startIndex);
         const searchQuery = urlParams.toString();
         const res = await fetch(`/api/post/getposts?${searchQuery}`);
         if(!res.ok){
            return;
         }
         if(res.ok){
            const data = await res.json();
            setPosts([...posts, ...data.posts]);
            if(data.posts.length === 9){
                setShowMore(true);
            } else{
                setShowMore(false)
            }
         }
    };
  return (
    <div className='flex flex-col md:flex-row'> 
        <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
            <form className='flex flex-col gap-8'
            onSubmit={handleSubmit}
            >
                <div className="flex items-center gap-2">
                    <label className='whitespace-nowrap font-semibold'>SearchTerm</label>
                    <TextInput
                    placeholder='search...'
                    id='searchTerm'
                    type='text' 
                    value={sidebarData.searchTerm}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <label className='whitespace-nowrap font-semibold'>Sort:</label>

                    <Select className='' onChange={handleChange}
                    value={sidebarData.sort}
                    id='sort'
                    >
                        <option value="desc">Latest</option>
                        <option value="asc">Oldest</option>

                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <label className='whitespace-nowrap font-semibold'>Category</label>

                    <Select className='' onChange={handleChange}
                    value={sidebarData.category}
                    id='category'
                    >
                        <option value="uncategorized">Select a Category</option>
  <option value={"javascript"}>javascript</option>
  <option value={"reactjs"}>React.js</option>
  <option value={"nextjs"}>Next.js</option>
  <option value={"nodejs"}>Node.js</option>
  <option value={"express"}>Express.js</option>
  <option value={"mongoDB"}>mongoDB</option>
  <option value={"mongoose"}>mongoose</option>
  <option value={"mySql"}>mySql</option>
  <option value={"tailwind"}>Tailwind</option>
  <option value={'redux'}>Redux</option>
  <option value={'flow-bite'}>Flow-Bite</option>
  <option value={'redux-persist'}>Redux-Persist</option>

                    </Select>
                </div>
                <Button type='submit' outline gradientDuoTone={"purpleToPink"}>Apply Filters</Button>

            </form>
        </div>
        <div className="w-full">
            <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Posts Results :</h1>
            <div className="p-7 flex flex-wrap gap-4">
                   {
                    !loading && posts.length === 0 && 
                    (<p>
                    Sorry, No posts found!
                     </p>)
                   }
                   {loading && <p className='text-xl text-gray-500'>Loading...</p> }

                   {!loading && posts && posts.map((post)=>(
                    <PostCard key={post._id} post={post} />
                   ))}
                   {showMore && <button className='text-teal-500 text-lg hover:underline p-7 w-full' onClick={handleShowMore}>Show more</button> }
            </div>
        </div>
    </div>
  )
}
