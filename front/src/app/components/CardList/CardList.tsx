import React from "react";

interface CardListProps {
    children: React.ReactNode;
}

const CardList = ({ children }: CardListProps) => {
    return (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
            {React.Children.map(children, child => (
                <div className="flex flex-col h-full justify-between bg-white shadow-md p-4">
                    {child}
                </div>
            ))}
        </div>
    );
};

export default CardList;
