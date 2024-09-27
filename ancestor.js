class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// Helper function to perform post-order traversal
function modifyTree(node) {
    if (node === null) return 0;
    
    // Recursively modify the right and left subtrees
    let leftSum = modifyTree(node.left);
    let rightSum = modifyTree(node.right);

    // Update the current node by adding the sum of left and right children
    node.val += leftSum + rightSum;

    // Return the updated value (node value + subtree values) to propagate upwards
    return node.val;
}

// Helper function to propagate right subtree value to the left subtree
function propagateValueToLeft(node, value) {
    if (node === null) return;

    // Add the accumulated value to the current node
    node.val += value;

    // Continue the propagation down the left subtree
    propagateValueToLeft(node.left, value);
}

// Main function to modify the tree
function modifyBinaryTree(root) {
    if (root === null) return;

    // Step 1: Modify the right subtree and get the accumulated value
    let rightSubtreeValue = modifyTree(root.right);

    // Step 2: Propagate the accumulated value from the right subtree to the left subtree
    propagateValueToLeft(root.left, rightSubtreeValue);
}
