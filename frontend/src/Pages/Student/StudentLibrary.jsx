import React, { useState } from 'react';
import { FaBook, FaSearch, FaBookmark, FaHistory } from 'react-icons/fa';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import StudentHeader from '../../components/StudentHeader';
import { useParams } from 'react-router-dom';

const StudentLibrary = () => {
    const { studentId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('browse'); // 'browse' or 'my-books'

    // Mock Data
    const books = [
        { id: 1, title: "Introduction to Algorithms", author: "Cormen, Leiserson", category: "Computer Science", status: "Available", cover: "https://m.media-amazon.com/images/I/41SNoh5ZhOL._SY445_SX342_.jpg" },
        { id: 2, title: "Clean Code", author: "Robert C. Martin", category: "Software Engineering", status: "Issued", returnDate: "2024-12-15", cover: "https://m.media-amazon.com/images/I/41xShlnTZTL._SY445_SX342_.jpg" },
        { id: 3, title: "Artificial Intelligence: A Modern Approach", author: "Russell & Norvig", category: "AI", status: "Available", cover: "https://m.media-amazon.com/images/I/81-OBtffKYL._SY466_.jpg" },
        { id: 4, title: "Database System Concepts", author: "Abraham Silberschatz", category: "Databases", status: "Available", cover: "https://m.media-amazon.com/images/I/81ibf74+wIL._SY466_.jpg" },
        { id: 5, title: "Operating System Concepts", author: "Silberschatz, Galvin", category: "OS", status: "Available", cover: "https://m.media-amazon.com/images/I/7106J0d-pLL._SY466_.jpg" },
    ];

    const myIssuedBooks = books.filter(b => b.status === "Issued"); // Mock logic: assuming logged in user has issued these

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background pb-12">
            <StudentHeader studentId={studentId} />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-navy">Library</h1>
                        <p className="text-text-grey">Explore resources and manage your issued books</p>
                    </div>
                    <div className="flex gap-2 bg-white p-1 rounded-lg border border-gray-200">
                        <button
                            onClick={() => setActiveTab('browse')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'browse' ? 'bg-sky-blue text-white shadow-sm' : 'text-text-grey hover:bg-gray-50'}`}
                        >
                            Browse Books
                        </button>
                        <button
                            onClick={() => setActiveTab('my-books')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'my-books' ? 'bg-sky-blue text-white shadow-sm' : 'text-text-grey hover:bg-gray-50'}`}
                        >
                            My Issued Books
                        </button>
                    </div>
                </div>

                {activeTab === 'browse' && (
                    <div className="space-y-6">
                        {/* Search Bar */}
                        <div className="relative max-w-xl">
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by title, author, or category..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-sky-blue focus:border-sky-blue outline-none transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Books Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredBooks.map(book => (
                                <Card key={book.id} className="hover:shadow-lg transition-shadow duration-300 group">
                                    <div className="aspect-[2/3] bg-gray-100 relative overflow-hidden">
                                        {/* Placeholder for cover if image fails or is generic */}
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                            <FaBook size={48} />
                                        </div>
                                        <img src={book.cover} alt={book.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute top-2 right-2">
                                            <Badge type={book.status === 'Available' ? 'success' : 'warning'}>
                                                {book.status}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <p className="text-xs text-sky-blue font-semibold uppercase tracking-wider mb-1">{book.category}</p>
                                        <h3 className="font-bold text-navy line-clamp-1" title={book.title}>{book.title}</h3>
                                        <p className="text-sm text-text-grey mb-3">{book.author}</p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                            disabled={book.status !== 'Available'}
                                        >
                                            {book.status === 'Available' ? 'Request Issue' : 'Currently Issued'}
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'my-books' && (
                    <div className="max-w-4xl">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FaBookmark className="text-sky-blue" /> Current Issues
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {myIssuedBooks.length > 0 ? (
                                    <div className="space-y-4">
                                        {myIssuedBooks.map(book => (
                                            <div key={book.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                                                <div className="w-16 h-24 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-navy">{book.title}</h3>
                                                    <p className="text-sm text-text-grey">{book.author}</p>
                                                    <div className="flex items-center gap-4 mt-2 text-sm">
                                                        <span className="text-gray-500">Issued: 2024-11-01</span>
                                                        <span className="text-red-500 font-medium">Due: {book.returnDate}</span>
                                                    </div>
                                                </div>
                                                <Button variant="secondary" size="sm">Renew</Button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <FaBook className="text-gray-300 text-2xl" />
                                        </div>
                                        <p className="text-text-grey">You haven't issued any books yet.</p>
                                        <button onClick={() => setActiveTab('browse')} className="text-sky-blue font-semibold mt-2 hover:underline">Browse Library</button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="mt-8">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FaHistory className="text-navy" /> History
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-text-grey text-center py-4">No past history available.</p>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentLibrary;
