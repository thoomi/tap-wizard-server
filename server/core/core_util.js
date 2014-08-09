////////////////////////////////////////////////////////////////////////////////
/// Module exports
/// Declares the name of the object which will be available through the 
/// require() function
////////////////////////////////////////////////////////////////////////////////
var util = module.exports = {};


////////////////////////////////////////////////////////////////////////////////
/// Simple helper function to create a random number between _low and _high boundaries
////////////////////////////////////////////////////////////////////////////////
util.createRandomNumber = function(_low, _high) {
    _high++;
    return Math.floor((Math.random() * (_high - _low) + _low));
};


////////////////////////////////////////////////////////////////////////////////
/// Simple helper function to shuffle an array
////////////////////////////////////////////////////////////////////////////////
util.shuffleArray = function(_array) {

    for (var index = _array.length - 1; index >= 1; index--)
    {
        var randomIndex = util.createRandomNumber(0, index);

        // Swap
        var tmp             = _array[index];
        _array[index]       = _array[randomIndex];
        _array[randomIndex] = tmp;
    }
};

////////////////////////////////////////////////////////////////////////////////
/// Queue
///
/// A function to represent a queue
/// 
/// http://code.stephenmorley.org/javascript/queues/
///
/// Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
/// the terms of the CC0 1.0 Universal legal code:
///
/// http://creativecommons.org/publicdomain/zero/1.0/legalcode
///
/// This Queue implementation avoids the expensive shift operation. Instead of
/// shifting an item from the front of the array when it is dequeued, it 
/// increments an internal offset to indicate that there is a space at the front
/// of the array. When this space takes up half the array, the Queue uses the 
/// slice function to remove it. Because n items are moved only after n dequeuing 
/// operations have occurred, the dequeue function runs in amortised constant time.
////////////////////////////////////////////////////////////////////////////////
util.Queue = function() {
    // -----------------------------------------------------------------------------
    // Queue member attributes
    // -----------------------------------------------------------------------------
    var m_queue  = [];
    var m_offset = 0;


    ////////////////////////////////////////////////////////////////////////////////
    /// \fn isEmpty()
    ///
    /// \brief Checks if the queue is empty
    ////////////////////////////////////////////////////////////////////////////////
    this.isEmpty = function() {
        return (m_queue.length === 0);
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn enqueue()
    ///
    /// \brief Enqueus the specified item
    ///
    /// \params _item The item to enqueue
    ////////////////////////////////////////////////////////////////////////////////
    this.enqueue = function(_item) {
        m_queue.push(_item);
    };

    ////////////////////////////////////////////////////////////////////////////////
    /// \fn dequeue()
    ///
    /// \brief Dequeues an item and returns it
    ///
    /// \return The dequeued item or null if the queue is empty
    ////////////////////////////////////////////////////////////////////////////////
    this.dequeue = function() {
        if (this.isEmpty())
        {
            return null;
        } 

        // -----------------------------------------------------------------------------
        // Store the item from the front of the queue.
        // -----------------------------------------------------------------------------
        var item = m_queue[m_offset];

        // -----------------------------------------------------------------------------
        // Set the slot in the array to null (This operation reduces the speed of the
        // Queue, but it reduces the memory cost)
        // -----------------------------------------------------------------------------
        m_queue[m_offset] = null;

        // -----------------------------------------------------------------------------
        // Increment the offset and remove the free space if necessary.
        // -----------------------------------------------------------------------------
        if (++m_offset * 2 >= m_queue.length)
        {
            m_queue  = m_queue.slice(m_offset);
            m_offset = 0;
        }

        return item;
    };
};
